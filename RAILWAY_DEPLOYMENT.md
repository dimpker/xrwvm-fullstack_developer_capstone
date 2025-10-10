# Railway Deployment Configuration Guide

## Step 1: Deploy Services to Railway

### Create 3 Railway Services from GitHub Repo:

1. **Node.js Database Service**
   - Root Directory: `server/database`
   - Will auto-detect from `package.json` and `nixpacks.toml`
   - After deployment, copy the public URL (e.g., `https://your-db.railway.app`)

2. **Flask Sentiment Service**
   - Root Directory: `sentiment_service`
   - Will auto-detect from `requirements.txt` and `railway.json`
   - After deployment, copy the public URL (e.g., `https://your-sentiment.railway.app`)

3. **Django Backend Service**
   - Root Directory: `server`
   - Will auto-detect from `requirements.txt` and `railway.json`
   - Configure environment variables (see below)

## Step 2: Configure Django Environment Variables on Railway

In your Django service on Railway, add these environment variables:

```
DJANGO_ALLOWED_HOSTS=your-django-url.railway.app,your-vercel-frontend.vercel.app
DJANGO_CSRF_TRUSTED_ORIGINS=https://your-django-url.railway.app,https://your-vercel-frontend.vercel.app
backend_url=https://your-node-database.railway.app
sentiment_analyzer_url=https://your-sentiment-service.railway.app/
```

**Important:** 
- Replace `your-django-url.railway.app` with your actual Django Railway URL
- Replace `your-node-database.railway.app` with your actual Node.js service URL
- Replace `your-sentiment-service.railway.app` with your actual Sentiment service URL
- Replace `your-vercel-frontend.vercel.app` with your Vercel frontend URL

## Step 3: Update Frontend to Use Railway Django URL

In your React frontend, update the API base URL to point to your Railway Django URL:

1. Find API configuration file (usually in `src/` folder)
2. Update API_BASE_URL to: `https://your-django-url.railway.app`

## Step 4: Redeploy Vercel Frontend

After updating the frontend API URL:
```bash
git add .
git commit -m "Update API URL to Railway Django backend"
git push origin main
```

Vercel will automatically redeploy with the new backend URL.

## Architecture Overview

```
[Vercel Frontend] 
    ↓
[Railway Django Backend] :8000
    ↓                    ↓
[Railway Node.js DB] :3030   [Railway Flask Sentiment] :5050
```

## Testing

1. **Test Node.js Database Service:**
   - Visit: `https://your-node-database.railway.app/fetchDealers`
   - Should return JSON with dealerships

2. **Test Sentiment Service:**
   - Visit: `https://your-sentiment-service.railway.app/health`
   - Should return: `{"status": "healthy", "service": "sentiment-analyzer"}`

3. **Test Django Backend:**
   - Visit: `https://your-django-url.railway.app/djangoapp/get_dealers/`
   - Should return dealers data

4. **Test Full Integration:**
   - Visit your Vercel frontend URL
   - All features should work with cloud backend
