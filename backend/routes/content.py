import os
import requests
from fastapi import APIRouter, HTTPException
from datetime import datetime, timedelta
import logging

logger = logging.getLogger(__name__)

router = APIRouter(tags=["content"])

# API Configuration
BASE_URL = "http://yildizaycp.ozdsystems.com/api"
UPLOADS_BASE_URL = "http://yildizaycp.ozdsystems.com/uploads"
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

def format_cover_url(cover):
    """Format cover URL"""
    if not cover:
        return None
    if cover.startswith('http'):
        return cover
    return f"{UPLOADS_BASE_URL}/{cover}"

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
        result = response.json()
        
        # Format cover URLs - external API returns data directly
        if result.get('data'):
            for item in result['data']:
                # Check for direct cover field
                if item.get('cover'):
                    item['coverUrl'] = format_cover_url(item['cover'])
                # Also check medias array for cover image
                elif item.get('medias') and len(item['medias']) > 0:
                    # Use first media file as cover
                    first_media = item['medias'][0]
                    if first_media.get('file'):
                        item['coverUrl'] = format_cover_url(first_media['file'])
        
        return result
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
        result = response.json()
        
        # Format cover URLs - external API returns data directly
        if result.get('data'):
            for item in result['data']:
                # Check for direct cover field
                if item.get('cover'):
                    item['coverUrl'] = format_cover_url(item['cover'])
                # Also check medias array for cover image
                elif item.get('medias') and len(item['medias']) > 0:
                    # Use first media file as cover
                    first_media = item['medias'][0]
                    if first_media.get('file'):
                        item['coverUrl'] = format_cover_url(first_media['file'])
        
        return result
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
        result = response.json()
        
        # Format cover URLs - external API returns data directly
        if result.get('data'):
            for item in result['data']:
                # Check for direct cover field
                if item.get('cover'):
                    item['coverUrl'] = format_cover_url(item['cover'])
                # Also check medias array for cover image
                elif item.get('medias') and len(item['medias']) > 0:
                    # Use first media file as cover
                    first_media = item['medias'][0]
                    if first_media.get('file'):
                        item['coverUrl'] = format_cover_url(first_media['file'])
        
        return result
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
        result = response.json()
        
        # Format cover URLs - external API returns data directly
        if result.get('data'):
            for item in result['data']:
                # Check for direct cover field
                if item.get('cover'):
                    item['coverUrl'] = format_cover_url(item['cover'])
                # Also check medias array for cover image
                elif item.get('medias') and len(item['medias']) > 0:
                    # Use first media file as cover
                    first_media = item['medias'][0]
                    if first_media.get('file'):
                        item['coverUrl'] = format_cover_url(first_media['file'])
        
        return result
    except requests.exceptions.RequestException as e:
        logger.error(f"Failed to fetch completed estates: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch completed estates")

@router.get("/estates/featured")
async def get_featured_estate():
    """Get featured estate (category 20)"""
    try:
        token = get_auth_token()
        
        # First try the category filter
        response = requests.get(
            f"{BASE_URL}/content/estates?categoryId=20",
            headers={"Authorization": f"Bearer {token}"},
            timeout=10
        )
        response.raise_for_status()
        result = response.json()
        
        # If category filter returns results, use it
        if result.get('data') and len(result['data']) > 0:
            item = result['data'][0]
            # Check for direct cover field
            if item.get('cover'):
                item['coverUrl'] = format_cover_url(item['cover'])
            # Also check medias array for cover image
            elif item.get('medias') and len(item['medias']) > 0:
                # Use first media file as cover
                first_media = item['medias'][0]
                if first_media.get('file'):
                    item['coverUrl'] = format_cover_url(first_media['file'])
            return {"data": item, "statusCode": 200, "errors": None}
        
        # Fallback: get all estates and filter for category 20
        response = requests.get(
            f"{BASE_URL}/content/estates",
            headers={"Authorization": f"Bearer {token}"},
            timeout=10
        )
        response.raise_for_status()
        all_estates = response.json()
        
        # Find estate with category 20
        if all_estates.get('data'):
            for estate in all_estates['data']:
                if estate.get('categories'):
                    for category in estate['categories']:
                        if category and category.get('categoryId') == 20:
                            # Found featured estate
                            if estate.get('cover'):
                                estate['coverUrl'] = format_cover_url(estate['cover'])
                            elif estate.get('medias') and len(estate['medias']) > 0:
                                first_media = estate['medias'][0]
                                if first_media.get('file'):
                                    estate['coverUrl'] = format_cover_url(first_media['file'])
                            return {"data": estate, "statusCode": 200, "errors": None}
        
        return {"data": None, "statusCode": 200, "errors": None}
    except requests.exceptions.RequestException as e:
        logger.error(f"Failed to fetch featured estate: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch featured estate")

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
        result = response.json()
        
        # Format cover URL for estate detail
        if result.get('data', {}).get('item'):
            estate_item = result['data']['item']
            # Check for direct cover field
            if estate_item.get('cover'):
                estate_item['coverUrl'] = format_cover_url(estate_item['cover'])
            # Also check medias array for cover image
            elif estate_item.get('medias') and len(estate_item['medias']) > 0:
                # Use first media file as cover
                first_media = estate_item['medias'][0]
                if first_media.get('file'):
                    estate_item['coverUrl'] = format_cover_url(first_media['file'])
        
        return result
    except requests.exceptions.RequestException as e:
        logger.error(f"Failed to fetch estate detail: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch estate detail")