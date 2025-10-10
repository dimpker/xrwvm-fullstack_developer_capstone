# Vercel Deployment Troubleshooting

## Current Situation
You have a blank Vercel deployment at: `https://capstone-project-hazel-psi.vercel.app/`

## Possible Issues and Solutions

### Issue 1: Multiple Vercel Projects
You might have multiple Vercel projects connected to the same GitHub repository.

**Check:**
1. Go to https://vercel.com/dashboard
2. Look at all your projects
3. You might see multiple projects like:
   - `capstone-project-hazel-psi`
   - `capstone-project-bdjjmfa75-andidollars-projects`
   - `capstone-project-8rqfqv6j5-andidollars-projects`

**Solution:**
- Delete the old/unused projects
- Keep only ONE Vercel project for your app
- Make sure it's connected to the correct GitHub repo

### Issue 2: Missing Environment Variables
The Vercel project needs the `REACT_APP_BACKEND_URL` environment variable.

**Fix:**
1. Go to your Vercel project dashboard
2. Click "Settings" → "Environment Variables"
3. Add this variable:
   - **Name**: `REACT_APP_BACKEND_URL`
   - **Value**: `https://djangobackend-production-dd54.up.railway.app`
   - **Environment**: Check all (Production, Preview, Development)
4. Click "Save"
5. Go to "Deployments" tab
6. Click "..." on the latest deployment → "Redeploy"

### Issue 3: Wrong Build Settings
The Vercel project might have incorrect build settings.

**Check Build Settings:**
1. Go to your Vercel project
2. Click "Settings" → "General"
3. Scroll down to "Build & Development Settings"
4. Make sure:
   - **Framework Preset**: Create React App
   - **Build Command**: `cd server/frontend && npm install && npm run build`
   - **Output Directory**: `server/frontend/build`
   - **Install Command**: `npm install` (or leave empty)

### Issue 4: Build Errors
Check if the deployment actually failed.

**Check Build Logs:**
1. Go to your Vercel project
2. Click on "Deployments" tab
3. Click on the latest deployment
4. Check the "Build Logs" for any errors
5. Common errors:
   - npm install failures
   - Missing dependencies
   - Build command issues
   - Environment variable issues

### Issue 5: Deployment from Wrong Branch
Make sure Vercel is deploying from the `main` branch with the latest code.

**Check:**
1. Go to Settings → Git
2. Make sure "Production Branch" is set to `main`
3. Check the latest deployment shows the correct commit
4. If not, manually trigger a redeploy from the "Deployments" tab

## Recommended Steps (In Order)

### Step 1: Verify Your Vercel Project
```
1. Go to https://vercel.com/dashboard
2. Find the project showing "capstone-project-hazel-psi.vercel.app"
3. Note the exact project name
```

### Step 2: Check Environment Variables
```
1. In that project, go to Settings → Environment Variables
2. Make sure REACT_APP_BACKEND_URL is set to:
   https://djangobackend-production-dd54.up.railway.app
3. If not, add it and select all environments
```

### Step 3: Verify Build Settings
```
1. Settings → General → Build & Development Settings
2. Framework Preset: Create React App
3. Build Command: cd server/frontend && npm install && npm run build
4. Output Directory: server/frontend/build
5. Root Directory: leave empty (or ./)
```

### Step 4: Check Latest Deployment
```
1. Go to Deployments tab
2. Click on the latest deployment
3. Check:
   - Did it succeed? (green checkmark)
   - What commit was deployed? (should be latest)
   - Are there errors in the build logs?
```

### Step 5: Force a Fresh Deployment
```
1. If everything above looks correct but site is still blank:
2. Go to Deployments tab
3. Find the latest deployment
4. Click "..." → "Redeploy"
5. Check "Use existing Build Cache" is UNCHECKED
6. Click "Redeploy"
```

### Step 6: Test the Deployment
Once redeployed, test:
```
1. Visit your Vercel URL
2. Open browser DevTools (F12)
3. Check Console tab for errors
4. Check Network tab to see if API calls are going to Railway
5. Try to register/login to test functionality
```

## Expected Working URLs

After fixing, you should have:
- **Frontend**: Your Vercel URL (e.g., capstone-project-hazel-psi.vercel.app)
- **Backend API**: https://djangobackend-production-dd54.up.railway.app
- **Node.js DB**: https://nodedatabase-production.up.railway.app (internal use)
- **Flask Sentiment**: https://flasksentiment-production.up.railway.app (internal use)

## If Still Not Working

If the site is still blank after all the above:

1. **Check browser console** (F12 → Console tab) for JavaScript errors
2. **Check if index.html is loading** - View page source, should see React app HTML
3. **Check if static files are loading** - Network tab should show CSS/JS files loading
4. **Try a different browser** or incognito mode to rule out caching issues
5. **Check Railway Django logs** to see if API calls are reaching the backend

## Quick Test Commands

Test Railway endpoints directly:
```bash
# Test Django backend
curl https://djangobackend-production-dd54.up.railway.app/djangoapp/get_dealers/

# Test Node.js database
curl https://nodedatabase-production.up.railway.app/fetchDealers

# Test Flask sentiment
curl https://flasksentiment-production.up.railway.app/health
```

## Need Help?
If you're still seeing a blank page, share:
1. Screenshot of Vercel deployment logs
2. Screenshot of browser console errors (F12)
3. The exact Vercel project name and URL
4. Whether Railway services are all running (check Railway dashboard)
