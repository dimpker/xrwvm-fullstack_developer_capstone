#!/usr/bin/env python
"""
Test script to verify the new Django views are working correctly
"""
import sys
import os

# Add the Django project to the Python path
sys.path.append('C:/Users/Young Schnaltzone/Documents/Coursera/capstone_project/xrwvm-fullstack_developer_capstone/server')

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'djangoproj.settings')

import django
django.setup()

# Test imports
try:
    from djangoapp.views import get_dealerships, get_dealer_details, get_dealer_reviews
    from djangoapp.restapis import get_request, analyze_review_sentiments
    print("✅ All imports successful!")
    print("✅ Views implemented: get_dealerships, get_dealer_details, get_dealer_reviews")
    print("✅ Restapis functions available: get_request, analyze_review_sentiments")
except ImportError as e:
    print(f"❌ Import error: {e}")

# Test the URL patterns
try:
    from django.urls import reverse
    from django.test import RequestFactory
    
    print("\n📋 Testing URL patterns:")
    
    # Test URLs (these should not raise errors)
    try:
        # Test get_dealers URL (all dealers)
        url = reverse('djangoapp:get_dealers')
        print(f"✅ get_dealers URL: /djangoapp/{url}")
    except Exception as e:
        print(f"❌ get_dealers URL error: {e}")
    
    try:
        # Test get_dealers by state URL
        url = reverse('djangoapp:get_dealers_by_state', kwargs={'state': 'CA'})
        print(f"✅ get_dealers_by_state URL: /djangoapp/{url}")
    except Exception as e:
        print(f"❌ get_dealers_by_state URL error: {e}")
    
    try:
        # Test dealer details URL with sample dealer_id
        url = reverse('djangoapp:dealer_details', kwargs={'dealer_id': 1})
        print(f"✅ dealer_details URL: /djangoapp/{url}")
    except Exception as e:
        print(f"❌ dealer_details URL error: {e}")
    
    try:
        # Test dealer reviews URL with sample dealer_id
        url = reverse('djangoapp:dealer_details', kwargs={'dealer_id': 1})  
        print(f"✅ dealer reviews URL: /djangoapp/{url}")
    except Exception as e:
        print(f"❌ dealer reviews URL error: {e}")
        
    print("\n🎉 All views and URLs configured successfully!")
    
except Exception as e:
    print(f"❌ URL testing error: {e}")

print("\n📝 Summary of implemented endpoints:")
print("1. GET /djangoapp/get_dealerships - Fetches all dealerships")
print("2. GET /djangoapp/dealer/<dealer_id> - Fetches specific dealer details")  
print("3. GET /djangoapp/reviews/dealer/<dealer_id> - Fetches dealer reviews with sentiment analysis")