# 🔐 Environment Variables Setup Guide

**SECURITY FIRST:** Never commit API keys to git!

---

## 🖥️ **Local Development (Windows)**

### **Option 1: Use SET_ENV_VARS.bat (Recommended)**

1. Double-click `SET_ENV_VARS.bat`
2. Paste your OpenRouter API key when prompted
3. Variables set for current session only

### **Option 2: Set Manually (PowerShell)**

```powershell
# Open PowerShell and run:
$env:DEEPSEEK_API_KEY = "sk-or-v1-your-actual-key-here"
$env:PYTHON_PATH = "py"

# Verify it's set:
echo $env:DEEPSEEK_API_KEY
```

### **Option 3: Set Permanently (Windows)**

⚠️ **Only if you're the only user on this PC:**

1. Open System Properties → Advanced → Environment Variables
2. Under "User variables", click "New"
3. Variable name: `DEEPSEEK_API_KEY`
4. Variable value: `sk-or-v1-your-actual-key-here`
5. Click OK

**Restart your terminal after this!**

---

## ☁️ **Render (Production)**

Environment variables are already set in Render dashboard:

1. Go to: https://dashboard.render.com
2. Select your service: `samuge-xray-ai`
3. Go to "Environment" tab
4. Variables should show:
   - `DEEPSEEK_API_KEY` = `sk-or-v1-...` (hidden)
   - `PYTHON_PATH` = `py`

**To update:**
1. Click "Edit" next to variable
2. Paste new value
3. Click "Save Changes"
4. Service will auto-redeploy

---

## 🧪 **Testing (Local)**

### **Quick Test:**

```bash
# Windows CMD:
echo %DEEPSEEK_API_KEY%

# Windows PowerShell:
echo $env:DEEPSEEK_API_KEY

# Should show: sk-or-v1-... (your key)
# If it shows nothing, the variable is not set!
```

### **Test in Python:**

```python
import os
api_key = os.environ.get('DEEPSEEK_API_KEY')
print(f"API Key found: {api_key is not None}")
print(f"Key prefix: {api_key[:10] if api_key else 'NOT SET'}")
```

---

## 🔒 **Security Checklist**

- [x] `.env` is in `.gitignore`
- [x] `.env.example` has NO real keys (only template)
- [x] Real keys only in:
  - Local environment variables (session or system)
  - Render dashboard (never in code)
- [x] Never commit `.env` to git
- [x] Never share API keys in screenshots/logs

---

## 📋 **File Structure**

```
xray-diagnosis-ai/
├── .env.example          ✅ Safe to commit (no secrets)
├── .env                  ❌ NEVER commit (in .gitignore)
├── .gitignore            ✅ Ensures .env is excluded
├── SET_ENV_VARS.bat      ✅ Helper to set variables
├── START_LOCAL_TEST.bat  ✅ Checks for variables
└── ENV_SETUP_GUIDE.md    ✅ This guide
```

---

## 🆘 **Troubleshooting**

### **Error: "DEEPSEEK_API_KEY not found"**

**Solution:**
1. Run `SET_ENV_VARS.bat` first
2. Then run `START_LOCAL_TEST.bat`
3. Or set variable manually (see Option 2 above)

### **Error: "401 Unauthorized"**

**Cause:** API key is invalid or expired

**Solution:**
1. Verify key on https://openrouter.ai/keys
2. Check you have credits
3. Copy the FULL key (including `sk-or-v1-`)
4. Set it again using `SET_ENV_VARS.bat`

### **Environment variable not persisting**

**Cause:** Variables set in CMD/PowerShell are session-only

**Solution:**
- Use Option 3 (Set Permanently) above
- Or run `SET_ENV_VARS.bat` each time before testing

---

## 🔑 **Getting Your API Key**

1. Go to: https://openrouter.ai/keys
2. Sign in / Sign up
3. Click "Create Key"
4. Copy the key (starts with `sk-or-v1-`)
5. Add credits to your account
6. Use the key in environment variables (never in code!)

---

## ✅ **Verification**

After setting up, verify everything works:

```bash
# 1. Check variable is set
echo %DEEPSEEK_API_KEY%

# 2. Start server
START_LOCAL_TEST.bat

# 3. Look for this in logs:
# 🔑 API Key status: Found
# 📡 Calling DeepSeek API via OpenRouter...
# ✅ DeepSeek report generated successfully
```

---

**Remember:** Security > Convenience. Always use environment variables for secrets! 🔐
