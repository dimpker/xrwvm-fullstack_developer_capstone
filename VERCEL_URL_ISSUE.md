# Vercel URL Keeps Changing - Solution

## The Problem
Vercel generates unique deployment URLs like:
- `capstone-project-hazel-psi.vercel.app`
- `capstone-project-2wqmtjw4o-andidollars-projects.vercel.app`
- `capstone-project-8rqfqv6j5-andidollars-projects.vercel.app`

This causes issues because Railway needs to know the exact Vercel URL for CORS settings.

## The Solution: Get Your Production Domain

### Step 1: Find Your Production Domain

1. Go to https://vercel.com/dashboard
2. Click on your project
3. Look at the **Domains** section at the top
4. You should see something like:
   ```
   Production Domain: capstone-project-xxxxx.vercel.app
   ```
   OR
   ```
   Production: your-project.vercel.app
   ```

**This is your stable production URL that won't change!**

### Step 2: Update Railway Environment Variables

Use the **production domain** (not the changing deployment URLs) in Railway:

```bash
DJANGO_ALLOWED_HOSTS=djangobackend-production-dd54.up.railway.app,<YOUR-PRODUCTION-DOMAIN>.vercel.app

DJANGO_CSRF_TRUSTED_ORIGINS=https://djangobackend-production-dd54.up.railway.app,https://<YOUR-PRODUCTION-DOMAIN>.vercel.app
```

Replace `<YOUR-PRODUCTION-DOMAIN>` with the domain you found in Step 1.

### Step 3: Set Vercel Environment Variable

In your Vercel project:
1. Go to **Settings** → **Environment Variables**
2. Add or update:
   - **Name**: `REACT_APP_BACKEND_URL`
   - **Value**: `https://djangobackend-production-dd54.up.railway.app`
   - **Environments**: Check all boxes (Production, Preview, Development)
3. Save

### Step 4: Redeploy Both Services

**Vercel:**
1. Go to **Deployments** tab
2. Click on latest deployment → **"..."** → **"Redeploy"**
3. Uncheck "Use existing Build Cache"
4. Click **Redeploy**

**Railway:**
Railway should auto-redeploy after you update the environment variables. If not:
1. Go to your Django service
2. Click on the three dots → **Restart**

## Alternative Solution: Use Wildcard (If Supported)

If Django and your version support wildcards, you can use:

```bash
# This allows ANY Vercel subdomain
DJANGO_ALLOWED_HOSTS=djangobackend-production-dd54.up.railway.app,.vercel.app

# For CSRF, you might need to list each domain explicitly
# Wildcards may not work in all Django versions for CSRF
DJANGO_CSRF_TRUSTED_ORIGINS=https://djangobackend-production-dd54.up.railway.app,https://capstone-project-2wqmtjw4o-andidollars-projects.vercel.app
```

## How to Check Your Current Vercel URL

Run this command to see what Vercel is using:
```bash
curl -I https://capstone-project-2wqmtjw4o-andidollars-projects.vercel.app/
```

Look for `x-vercel-id` header or check the response.

## Why URLs Keep Changing

Vercel creates:
- **Production deployments**: Stable URL (e.g., `my-project.vercel.app`)
- **Preview deployments**: Unique URLs for each deployment/commit
- **Branch deployments**: URLs for specific git branches

Make sure you're using the **Production** URL in your Railway configuration!

## Current Working Configuration

Based on your latest deployment:

**Vercel URL (Latest):**
```
https://capstone-project-2wqmtjw4o-andidollars-projects.vercel.app
```

**Railway Django Environment Variables:**
```bash
DJANGO_ALLOWED_HOSTS=djangobackend-production-dd54.up.railway.app,capstone-project-2wqmtjw4o-andidollars-projects.vercel.app

DJANGO_CSRF_TRUSTED_ORIGINS=https://djangobackend-production-dd54.up.railway.app,https://capstone-project-2wqmtjw4o-andidollars-projects.vercel.app

backend_url=https://nodedatabase-production.up.railway.app

sentiment_analyzer_url=https://flasksentiment-production.up.railway.app/
```

**Vercel Environment Variable:**
```bash
REACT_APP_BACKEND_URL=https://djangobackend-production-dd54.up.railway.app
```

## Quick Fix for Now

Update Railway with the latest Vercel URL: `capstone-project-2wqmtjw4o-andidollars-projects.vercel.app`

Then check your Vercel dashboard to see if there's a stable production domain you should be using instead!
