import os
import requests
from fastapi import APIRouter, HTTPException
from datetime import datetime, timedelta
import logging

logger = logging.getLogger(__name__)

router = APIRouter(tags=["content"])

# API Configuration
BASE_URL = "http://yildizaycp.ozdsystems.com/api"
USERNAME = "yildizay"
PASSWORD = "sjb5M5t6ATEQF6L"

# Token cache
_token_cache = {
    "token": None,
    "expiration": None
}

def get_auth_token():
    """Get JWT token with caching"""
    now = datetime.utcnow()
    
    # Check if token is still valid
    if _token_cache["token"] and _token_cache["expiration"]:
        if now < _token_cache["expiration"]:
            return _token_cache["token"]
    
    # Get new token
    try:
        response = requests.post(
            f"{BASE_URL}/auth/token",
            json={"username": USERNAME, "password": PASSWORD},
            timeout=10
        )
        response.raise_for_status()
        data = response.json()
        
        _token_cache["token"] = data["token"]
        # Cache for 23 hours (token valid for 24h)
        _token_cache["expiration"] = now + timedelta(hours=23)
        
        return data["token"]
    except Exception as e:
        logger.error(f"Failed to get auth token: {str(e)}")
        raise HTTPException(status_code=500, detail="Authentication failed")

@router.get("/blogs")
async def get_blogs():
    """Get all blog posts"""
    try:
        token = get_auth_token()
        response = requests.get(
            f"{BASE_URL}/content/blogs",
            headers={"Authorization": f"Bearer {token}"},
            timeout=10
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        logger.error(f"Failed to fetch blogs: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch blogs")

@router.get("/estates")
async def get_estates(category_id: int = None):
    """Get all estates/projects"""
    try:
        token = get_auth_token()
        url = f"{BASE_URL}/content/estates"
        if category_id:
            url += f"?categoryId={category_id}"
        
        response = requests.get(
            url,
            headers={"Authorization": f"Bearer {token}"},
            timeout=10
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        logger.error(f"Failed to fetch estates: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch estates")

@router.get("/estates/ongoing")
async def get_ongoing_estates():
    """Get ongoing projects (category 18)"""
    try:
        token = get_auth_token()
        response = requests.get(
            f"{BASE_URL}/content/estates/ongoing",
            headers={"Authorization": f"Bearer {token}"},
            timeout=10
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        logger.error(f"Failed to fetch ongoing estates: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch ongoing estates")

@router.get("/estates/completed")
async def get_completed_estates():
    """Get completed projects (category 19)"""
    try:
        token = get_auth_token()
        response = requests.get(
            f"{BASE_URL}/content/estates/completed",
            headers={"Authorization": f"Bearer {token}"},
            timeout=10
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        logger.error(f"Failed to fetch completed estates: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch completed estates")

@router.get("/estates/{estate_id}")
async def get_estate_detail(estate_id: int):
    """Get single estate detail"""
    try:
        token = get_auth_token()
        response = requests.get(
            f"{BASE_URL}/content/estates/{estate_id}",
            headers={"Authorization": f"Bearer {token}"},
            timeout=10
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        logger.error(f"Failed to fetch estate detail: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch estate detail")
