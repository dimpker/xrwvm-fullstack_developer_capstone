# Railway Environment Variables - Quick Reference

## Django Backend Service Environment Variables

### Copy these exact values to your Railway Django service:

```
DJANGO_ALLOWED_HOSTS=djangobackend-production-dd54.up.railway.app,capstone-project-8rqfqv6j5-andidollars-projects.vercel.app

DJANGO_CSRF_TRUSTED_ORIGINS=https://djangobackend-production-dd54.up.railway.app,https://capstone-project-8rqfqv6j5-andidollars-projects.vercel.app

backend_url=https://nodedatabase-production.up.railway.app

sentiment_analyzer_url=https://flasksentiment-production.up.railway.app/
```

## Important Notes:

### DJANGO_ALLOWED_HOSTS
- ❌ Do NOT include `https://`
- ❌ Do NOT include trailing slashes
- ✅ Just domain names separated by commas
- ✅ Include: Django domain + Vercel domain

### DJANGO_CSRF_TRUSTED_ORIGINS
- ✅ MUST include `https://`
- ❌ Do NOT include trailing slashes
- ✅ Full URLs separated by commas
- ✅ Include: Django URL + Vercel URL

### backend_url
- ✅ Full URL to Node.js database service
- ✅ Include `https://`

### sentiment_analyzer_url
- ✅ Full URL to Flask sentiment service
- ✅ Include `https://`
- ✅ Include trailing slash (Flask expects it)

## Current Deployment URLs:

- **Vercel Frontend**: https://capstone-project-8rqfqv6j5-andidollars-projects.vercel.app
- **Railway Django**: https://djangobackend-production-dd54.up.railway.app
- **Railway Node.js**: https://nodedatabase-production.up.railway.app
- **Railway Flask**: https://flasksentiment-production.up.railway.app

## How to Update on Railway:

1. Go to Railway dashboard
2. Click on "djangobackend" service
3. Go to "Variables" tab
4. Update each variable with the values above
5. Railway will automatically redeploy your service
6. Wait 2-3 minutes for deployment to complete
7. Check logs to verify Django starts without errors
