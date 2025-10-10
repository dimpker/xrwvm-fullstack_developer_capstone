# Fix: No Domains Showing in Vercel

## The Situation
Your Vercel project shows no domains in the Domains section. The deployment URLs keep changing with each deploy.

## Why This Happens
- First deployment might still be in progress
- Build might have failed
- Project settings might be incorrect

## Solution: Check Deployment Status & Logs

### Step 1: Check if Deployment Succeeded
1. Go to your Vercel project
2. Click on **Deployments** tab
3. Look at the latest deployment
4. Check the status:
   - ✅ **Green checkmark** = Success
   - ❌ **Red X** = Failed
   - 🔄 **Building** = In progress

### Step 2: If Deployment Failed, Check Logs
1. Click on the failed deployment
2. Read the **Build Logs** section
3. Look for errors (usually highlighted in red)
4. Common errors:
   - `npm install` failures
   - Missing files or directories
   - Build command issues
   - Environment variable issues

### Step 3: Common Build Failures & Fixes

#### Error: "No such file or directory"
**Fix:** Check your `vercel.json` paths are correct:
```json
{
  "buildCommand": "cd server/frontend && npm install && npm run build",
  "outputDirectory": "server/frontend/build"
}
```

#### Error: "Command failed"
**Fix:** Make sure `server/frontend/package.json` exists and has a `build` script.

#### Error: "Module not found"
**Fix:** The build needs to install dependencies. Environment variable should be set.

### Step 4: Assign a Production Domain Manually

If deployments succeed but no domain appears:

1. Go to your project → **Settings** → **Domains**
2. You should see an option to add a domain
3. Vercel should automatically suggest: `your-project-name.vercel.app`
4. Click to add it as your production domain

**OR** Vercel will automatically create one after the first successful deployment.

## Temporary Workaround: Use Preview URLs

Since you don't have a stable domain yet, use the preview URL that's working:

**Current working URL:** `capstone-project-2wqmtjw4o-andidollars-projects.vercel.app`

### Update Railway with this URL:

```bash
DJANGO_ALLOWED_HOSTS=djangobackend-production-dd54.up.railway.app,capstone-project-2wqmtjw4o-andidollars-projects.vercel.app

DJANGO_CSRF_TRUSTED_ORIGINS=https://djangobackend-production-dd54.up.railway.app,https://capstone-project-2wqmtjw4o-andidollars-projects.vercel.app
```

**Important:** You'll need to update this every time Vercel generates a new URL until you get a stable production domain.

## Alternative: Check Project Settings

### Verify Build Configuration
1. Go to **Settings** → **General**
2. Scroll to **Build & Development Settings**
3. Make sure these are set:
   - **Framework Preset**: `Create React App`
   - **Build Command**: `cd server/frontend && npm install && npm run build`
   - **Output Directory**: `server/frontend/build`
   - **Root Directory**: (leave empty)

### Verify Environment Variables
1. Go to **Settings** → **Environment Variables**
2. Make sure `REACT_APP_BACKEND_URL` is set:
   - **Name**: `REACT_APP_BACKEND_URL`
   - **Value**: `https://djangobackend-production-dd54.up.railway.app`
   - **Environments**: All checked (Production, Preview, Development)

## Force a Clean Deployment

If everything looks correct but still no stable domain:

1. Go to **Deployments** tab
2. Click on the latest deployment
3. Click **"..."** → **"Redeploy"**
4. **UNCHECK** "Use existing Build Cache"
5. Click **Redeploy**
6. Wait 2-5 minutes
7. After success, check **Settings** → **Domains** again

## What to Look For in Vercel Dashboard

When you open your project, you should see at the top:
```
Production: [Your stable domain here]
Latest Deployment: [Current deployment URL]
```

If you only see "Latest Deployment" without "Production", it means:
- First successful deployment hasn't completed yet
- Or you need to manually set a production domain

## Next Steps

1. **Check your latest deployment status** - Is it successful?
2. **If failed**, share the error from build logs
3. **If successful**, wait a few minutes and check Domains section again
4. **If still no domain**, you can manually add one in Settings → Domains

## For Now: Use the Current URL

While we wait for a stable domain, update Railway with:
```
capstone-project-2wqmtjw4o-andidollars-projects.vercel.app
```

And test if the site loads. If it's still blank, we need to check the Vercel build logs for errors!
