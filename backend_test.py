#!/usr/bin/env python3
"""
Backend API Testing for YILDIZAY Construction Website
Tests all content API endpoints for proper functionality, authentication, and data structure.
"""

import requests
import json
import sys
from typing import Dict, Any, Optional
import time

# Configuration
BACKEND_URL = "https://construction-hub-55.preview.emergentagent.com/api"
TIMEOUT = 30

class APITester:
    def __init__(self):
        self.results = {
            "total_tests": 0,
            "passed": 0,
            "failed": 0,
            "errors": []
        }
        self.estate_ids = []  # Store estate IDs for detail testing
    
    def log_result(self, test_name: str, success: bool, message: str, details: Optional[Dict] = None):
        """Log test result"""
        self.results["total_tests"] += 1
        if success:
            self.results["passed"] += 1
            print(f"✅ {test_name}: {message}")
        else:
            self.results["failed"] += 1
            error_info = {
                "test": test_name,
                "message": message,
                "details": details or {}
            }
            self.results["errors"].append(error_info)
            print(f"❌ {test_name}: {message}")
            if details:
                print(f"   Details: {json.dumps(details, indent=2)}")
    
    def test_endpoint(self, endpoint: str, test_name: str, expected_fields: list = None) -> Optional[Dict]:
        """Generic endpoint test"""
        try:
            print(f"\n🔍 Testing {test_name}...")
            print(f"   URL: {BACKEND_URL}{endpoint}")
            
            response = requests.get(f"{BACKEND_URL}{endpoint}", timeout=TIMEOUT)
            
            # Check status code
            if response.status_code != 200:
                self.log_result(test_name, False, 
                    f"HTTP {response.status_code}", 
                    {"status_code": response.status_code, "response": response.text[:500]})
                return None
            
            # Parse JSON
            try:
                data = response.json()
            except json.JSONDecodeError as e:
                self.log_result(test_name, False, 
                    f"Invalid JSON response: {str(e)}", 
                    {"response_text": response.text[:500]})
                return None
            
            # Check expected fields if provided
            if expected_fields:
                missing_fields = []
                for field in expected_fields:
                    if field not in data:
                        missing_fields.append(field)
                
                if missing_fields:
                    self.log_result(test_name, False, 
                        f"Missing required fields: {missing_fields}", 
                        {"response_structure": list(data.keys()) if isinstance(data, dict) else "Not a dict"})
                    return data
            
            self.log_result(test_name, True, "Endpoint accessible and returns valid JSON")
            return data
            
        except requests.exceptions.Timeout:
            self.log_result(test_name, False, f"Request timeout after {TIMEOUT}s")
            return None
        except requests.exceptions.ConnectionError:
            self.log_result(test_name, False, "Connection error - backend may be down")
            return None
        except Exception as e:
            self.log_result(test_name, False, f"Unexpected error: {str(e)}")
            return None
    
    def validate_cover_url(self, cover_url: str, test_context: str) -> bool:
        """Validate cover URL format"""
        if not cover_url:
            return False
        
        expected_base = "http://yildizaycp.ozdsystems.com/uploads/"
        if not cover_url.startswith(expected_base):
            self.log_result(f"{test_context} - Cover URL Format", False, 
                f"Invalid cover URL format. Expected to start with {expected_base}, got: {cover_url}")
            return False
        
        self.log_result(f"{test_context} - Cover URL Format", True, 
            f"Cover URL properly formatted: {cover_url}")
        return True
    
    def test_blogs_endpoint(self):
        """Test GET /api/content/blogs"""
        data = self.test_endpoint("/content/blogs", "Blogs Endpoint", ["data"])
        
        if not data:
            return
        
        # Check data structure
        if not isinstance(data.get("data"), list):
            self.log_result("Blogs Data Structure", False, 
                "Expected 'data' to be a list", 
                {"data_type": type(data.get("data")).__name__})
            return
        
        blogs = data["data"]
        if len(blogs) == 0:
            self.log_result("Blogs Content", False, "No blogs returned")
            return
        
        self.log_result("Blogs Content", True, f"Retrieved {len(blogs)} blog articles")
        
        # Test first blog structure - the external API returns data directly, not wrapped in "item"
        first_blog = blogs[0]
        
        # Check required fields for blog display
        required_fields = ["name", "shortDesc"]
        missing_fields = [field for field in required_fields if field not in first_blog]
        
        if missing_fields:
            self.log_result("Blogs Required Fields", False, 
                f"Missing required fields: {missing_fields}",
                {"available_fields": list(first_blog.keys())})
        else:
            self.log_result("Blogs Required Fields", True, 
                "Required fields present (name, shortDesc)")
        
        # Check for coverUrl (should be added by backend)
        if "coverUrl" in first_blog:
            self.validate_cover_url(first_blog["coverUrl"], "Blogs")
        else:
            # Check if there's a cover field that should be formatted
            if "cover" in first_blog:
                self.log_result("Blogs - Cover URL", False, 
                    "Backend not formatting cover field to coverUrl")
            else:
                self.log_result("Blogs - Cover URL", False, 
                    "No cover image data available")
    
    def test_estates_endpoint(self):
        """Test GET /api/content/estates"""
        data = self.test_endpoint("/content/estates", "Estates Endpoint", ["data"])
        
        if not data:
            return
        
        # Check data structure
        if not isinstance(data.get("data"), list):
            self.log_result("Estates Data Structure", False, 
                "Expected 'data' to be a list", 
                {"data_type": type(data.get("data")).__name__})
            return
        
        estates = data["data"]
        if len(estates) == 0:
            self.log_result("Estates Content", False, "No estates returned")
            return
        
        self.log_result("Estates Content", True, f"Retrieved {len(estates)} estate projects")
        
        # Store estate IDs for detail testing - external API returns data directly
        for estate in estates:
            if "id" in estate:
                self.estate_ids.append(estate["id"])
        
        # Test first estate structure - external API returns data directly, not wrapped in "item"
        first_estate = estates[0]
        
        # Check required fields (using actual field names from API)
        required_fields = ["id", "name", "shortDesc"]
        missing_fields = [field for field in required_fields if field not in first_estate]
        
        if missing_fields:
            self.log_result("Estates Required Fields", False, 
                f"Missing required fields: {missing_fields}",
                {"available_fields": list(first_estate.keys())})
        else:
            self.log_result("Estates Required Fields", True, 
                "Required fields present (id, name, shortDesc)")
        
        # Check for coverUrl (should be added by backend)
        if "coverUrl" in first_estate:
            self.validate_cover_url(first_estate["coverUrl"], "Estates")
        else:
            # Check if there's media data that should be formatted
            if "medias" in first_estate and first_estate["medias"]:
                self.log_result("Estates - Cover URL", False, 
                    "Backend not formatting media files to coverUrl")
            else:
                self.log_result("Estates - Cover URL", False, 
                    "No media/cover image data available")
    
    def test_featured_estate_endpoint(self):
        """Test GET /api/content/estates/featured"""
        data = self.test_endpoint("/content/estates/featured", "Featured Estate Endpoint", ["data", "statusCode"])
        
        if not data:
            return
        
        # Check if featured estate exists
        if not data.get("data"):
            self.log_result("Featured Estate Content", False, "No featured estate returned (category 20 may be empty)")
            return
        
        featured_estate = data["data"]
        # The featured estate endpoint now returns data directly, not wrapped in "item"
        estate_item = featured_estate
        
        # Check required fields for hero section (using actual API field names)
        required_fields = ["name", "shortDesc"]
        missing_fields = [field for field in required_fields if field not in estate_item]
        
        if missing_fields:
            self.log_result("Featured Estate Required Fields", False, 
                f"Missing required fields for hero section: {missing_fields}",
                {"available_fields": list(estate_item.keys())})
        else:
            self.log_result("Featured Estate Required Fields", True, 
                "Required fields present for hero section (name, shortDesc)")
        
        # Check for coverUrl
        if "coverUrl" in estate_item:
            self.validate_cover_url(estate_item["coverUrl"], "Featured Estate")
        else:
            self.log_result("Featured Estate - Cover URL", False, "coverUrl field missing from featured estate")
        
        self.log_result("Featured Estate Content", True, 
            f"Featured estate retrieved: {estate_item.get('Name', 'Unknown')}")
    
    def test_estate_detail_endpoint(self):
        """Test GET /api/content/estates/{estate_id}"""
        if not self.estate_ids:
            self.log_result("Estate Detail Test", False, 
                "No estate IDs available for testing (estates endpoint may have failed)")
            return
        
        # Test with estate ID 4 which has media data and is featured
        estate_id = 4 if 4 in self.estate_ids else self.estate_ids[0]
        endpoint = f"/content/estates/{estate_id}"
        
        data = self.test_endpoint(endpoint, f"Estate Detail Endpoint (ID: {estate_id})", ["data"])
        
        if not data:
            return
        
        # Check if estate detail exists
        if not data.get("data"):
            self.log_result("Estate Detail Content", False, f"No estate detail returned for ID {estate_id}")
            return
        
        estate_detail = data["data"]
        if "item" not in estate_detail:
            self.log_result("Estate Detail Structure", False, "Estate detail missing 'item' field")
            return
        
        estate_item = estate_detail["item"]
        
        # Check required fields for modal (using actual API field names)
        required_fields = ["name", "shortDesc"]
        missing_fields = [field for field in required_fields if field not in estate_item]
        
        if missing_fields:
            self.log_result("Estate Detail Required Fields", False, 
                f"Missing required fields for modal: {missing_fields}",
                {"available_fields": list(estate_item.keys())})
        else:
            self.log_result("Estate Detail Required Fields", True, 
                "Required fields present for modal display")
        
        # Check for estate stats (optional but important for modal)
        stats_fields = ["roomCount", "bathroomCount", "grossArea", "netArea"]
        available_stats = [field for field in stats_fields if field in estate_item]
        
        if available_stats:
            self.log_result("Estate Detail Stats", True, 
                f"Estate stats available: {available_stats}")
        else:
            self.log_result("Estate Detail Stats", False, 
                "No estate statistics available (roomCount, bathroomCount, grossArea, netArea)")
        
        # Check for coverUrl
        if "coverUrl" in estate_item:
            self.validate_cover_url(estate_item["coverUrl"], "Estate Detail")
        else:
            self.log_result("Estate Detail - Cover URL", False, "coverUrl field missing from estate detail")
        
        self.log_result("Estate Detail Content", True, 
            f"Estate detail retrieved: {estate_item.get('Name', 'Unknown')}")
    
    def test_image_accessibility(self):
        """Test if cover images are accessible"""
        print(f"\n🔍 Testing Image Accessibility...")
        
        # Test a sample image URL format
        sample_url = "http://yildizaycp.ozdsystems.com/uploads/sample.jpg"
        
        try:
            # Just test if the uploads directory is accessible (HEAD request)
            response = requests.head("http://yildizaycp.ozdsystems.com/uploads/", timeout=10)
            if response.status_code in [200, 403, 404]:  # 403/404 are acceptable for directory listing
                self.log_result("Image Server Accessibility", True, 
                    "Image server is accessible")
            else:
                self.log_result("Image Server Accessibility", False, 
                    f"Image server returned status {response.status_code}")
        except Exception as e:
            self.log_result("Image Server Accessibility", False, 
                f"Cannot reach image server: {str(e)}")
    
    def run_all_tests(self):
        """Run all backend API tests"""
        print("=" * 60)
        print("🚀 YILDIZAY Construction Website - Backend API Testing")
        print("=" * 60)
        print(f"Backend URL: {BACKEND_URL}")
        print(f"Timeout: {TIMEOUT}s")
        
        # Test all endpoints
        self.test_blogs_endpoint()
        self.test_estates_endpoint()
        self.test_featured_estate_endpoint()
        self.test_estate_detail_endpoint()
        self.test_image_accessibility()
        
        # Print summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        print(f"Total Tests: {self.results['total_tests']}")
        print(f"Passed: {self.results['passed']} ✅")
        print(f"Failed: {self.results['failed']} ❌")
        
        if self.results['failed'] > 0:
            print(f"\n🔍 FAILED TESTS DETAILS:")
            for error in self.results['errors']:
                print(f"\n❌ {error['test']}")
                print(f"   Message: {error['message']}")
                if error['details']:
                    print(f"   Details: {json.dumps(error['details'], indent=4)}")
        
        success_rate = (self.results['passed'] / self.results['total_tests']) * 100 if self.results['total_tests'] > 0 else 0
        print(f"\n🎯 Success Rate: {success_rate:.1f}%")
        
        if success_rate >= 80:
            print("🎉 Backend API testing completed successfully!")
        else:
            print("⚠️  Backend API has critical issues that need attention.")
        
        return self.results

if __name__ == "__main__":
    tester = APITester()
    results = tester.run_all_tests()
    
    # Exit with error code if tests failed
    if results['failed'] > 0:
        sys.exit(1)
    else:
        sys.exit(0)