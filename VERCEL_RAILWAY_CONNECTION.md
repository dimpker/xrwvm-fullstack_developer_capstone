# 🚀 Complete Vercel-Railway Connection Guide

## Overview
This guide shows you how to connect your Vercel frontend with your Railway backend services.

**Architecture:**
```
[Vercel Frontend (React)]
         ↓
[Railway Django Backend] → [Railway Node.js DB] + [Railway Flask Sentiment]
```

---

## 📋 Step-by-Step Instructions

### **PART 1: Deploy to Railway (Backend Services)**

#### 1.1 Go to Railway
- Visit: https://railway.app
- Sign in with GitHub
- Click "New Project"

#### 1.2 Deploy Node.js Database Service
1. Click "Deploy from GitHub repo"
2. Select: `xrwvm-fullstack_developer_capstone`
3. Click on the service → **Settings** → **Root Directory**
4. Set Root Directory: `server/database`
5. Save and wait for deployment
6. Go to **Settings** → **Networking** → **Generate Domain**
7. **COPY THIS URL** (e.g., `https://server-database-production-xxxx.up.railway.app`)

#### 1.3 Deploy Flask Sentiment Service
1. In the same project, click **"+ New"** → **"GitHub Repo"**
2. Select same repo: `xrwvm-fullstack_developer_capstone`
3. Click on service → **Settings** → **Root Directory**
4. Set Root Directory: `sentiment_service`
5. Save and wait for deployment
6. Go to **Settings** → **Networking** → **Generate Domain**
7. **COPY THIS URL** (e.g., `https://sentiment-service-production-yyyy.up.railway.app`)

#### 1.4 Deploy Django Backend Service
1. Click **"+ New"** → **"GitHub Repo"** again
2. Select same repo: `xrwvm-fullstack_developer_capstone`
3. Click on service → **Settings** → **Root Directory**
4. Set Root Directory: `server`
5. **BEFORE deploying**, click on **Variables** tab
6. Add these environment variables:

```bash
DJANGO_ALLOWED_HOSTS=YOUR_DJANGO_URL.up.railway.app,capstone-project-bdjjmfa75-andidollars-projects.vercel.app

DJANGO_CSRF_TRUSTED_ORIGINS=https://YOUR_DJANGO_URL.up.railway.app,https://capstone-project-bdjjmfa75-andidollars-projects.vercel.app

backend_url=https://YOUR_NODE_DATABASE_URL.up.railway.app

sentiment_analyzer_url=https://YOUR_SENTIMENT_URL.up.railway.app/
```

**IMPORTANT:** Replace these placeholders:
- `YOUR_NODE_DATABASE_URL` = The URL you copied in step 1.2
- `YOUR_SENTIMENT_URL` = The URL you copied in step 1.3
- `YOUR_DJANGO_URL` = Will be generated after deployment (see step 7)

7. Save variables, then go to **Settings** → **Networking** → **Generate Domain**
8. **COPY THIS DJANGO URL** (e.g., `https://server-production-zzzz.up.railway.app`)
9. Go back to **Variables** and update `DJANGO_ALLOWED_HOSTS` and `DJANGO_CSRF_TRUSTED_ORIGINS` with this actual Django URL
10. Click **"Redeploy"** to apply changes

---

### **PART 2: Update Frontend Configuration**

#### 2.1 Update Environment Variable
In your local project:

1. Open file: `server/frontend/.env.production`
2. Replace `https://your-django-service.up.railway.app` with your **actual Django Railway URL** from step 1.4.8
3. Example:
```bash
REACT_APP_BACKEND_URL=https://server-production-zzzz.up.railway.app
```

#### 2.2 Update All Frontend Components
You need to update these files to use `BACKEND_URL` instead of `window.location.origin`:

**Files to update:**
- `server/frontend/src/components/Login/Login.jsx` ✅ (Already done)
- `server/frontend/src/components/Register/Register.jsx`
- `server/frontend/src/components/Header/Header.jsx`
- `server/frontend/src/components/Dealers/Dealers.jsx`
- `server/frontend/src/components/Dealers/Dealer.jsx`
- `server/frontend/src/components/Dealers/PostReview.jsx`

**Pattern to follow:**
```javascript
// OLD CODE:
let login_url = window.location.origin + "/djangoapp/login";

// NEW CODE:
import { BACKEND_URL } from '../../config';
let login_url = BACKEND_URL + "/djangoapp/login";
```

#### 2.3 Commit and Push Changes
```bash
cd "C:\Users\Young Schnaltzone\Documents\Coursera\capstone_project\xrwvm-fullstack_developer_capstone"
git add .
git commit -m "Connect frontend to Railway backend"
git push origin main
```

Vercel will automatically redeploy with the new configuration!

---

### **PART 3: Test Everything**

#### 3.1 Test Railway Services
1. **Node.js Database:**
   - Visit: `https://YOUR_NODE_URL/fetchDealers`
   - Should return JSON with dealerships

2. **Flask Sentiment:**
   - Visit: `https://YOUR_SENTIMENT_URL/health`
   - Should return: `{"status": "healthy", "service": "sentiment-analyzer"}`

3. **Django Backend:**
   - Visit: `https://YOUR_DJANGO_URL/djangoapp/get_dealers/`
   - Should return dealers data

#### 3.2 Test Vercel Frontend
1. Visit your Vercel URL: `https://capstone-project-bdjjmfa75-andidollars-projects.vercel.app`
2. Try these features:
   - Register a new account
   - Login
   - View dealers
   - Post a review
   - Check sentiment analysis

---

## 🔧 Troubleshooting

### CORS Errors
If you see CORS errors in browser console:

1. Check Django `DJANGO_CSRF_TRUSTED_ORIGINS` includes your Vercel URL
2. Check Django `DJANGO_ALLOWED_HOSTS` includes your Vercel URL
3. Redeploy Django service on Railway

### 404 Errors
1. Make sure all Railway services have public domains generated
2. Verify environment variables are correct (no typos!)
3. Check Railway logs for each service

### Login/Register Not Working
1. Check browser console for API errors
2. Verify `BACKEND_URL` in `.env.production` is correct
3. Test Django auth endpoints directly

---

## 📝 Quick Reference

**Your URLs:**
- Vercel Frontend: `https://capstone-project-bdjjmfa75-andidollars-projects.vercel.app`
- Railway Django: `https://YOUR_DJANGO_URL.up.railway.app`
- Railway Node DB: `https://YOUR_NODE_URL.up.railway.app`
- Railway Sentiment: `https://YOUR_SENTIMENT_URL.up.railway.app`

**Environment Variables Needed:**

**Railway Django Service:**
```
DJANGO_ALLOWED_HOSTS=<django-url>,<vercel-url>
DJANGO_CSRF_TRUSTED_ORIGINS=https://<django-url>,https://<vercel-url>
backend_url=https://<node-url>
sentiment_analyzer_url=https://<sentiment-url>/
```

**Vercel (via .env.production):**
```
REACT_APP_BACKEND_URL=https://<django-url>
```

---

## ✅ Completion Checklist

- [ ] All 3 Railway services deployed successfully
- [ ] Railway Django has all environment variables configured
- [ ] All Railway services have public domains generated
- [ ] Frontend `.env.production` updated with Django URL
- [ ] All frontend components updated to use `BACKEND_URL`
- [ ] Changes committed and pushed to GitHub
- [ ] Vercel redeployed automatically
- [ ] All Railway endpoints tested and working
- [ ] Vercel frontend tested and working

**You're done! 🎉**
