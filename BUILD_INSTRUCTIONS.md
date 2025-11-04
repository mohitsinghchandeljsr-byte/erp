# Building CARVI(cu) Desktop App for Windows 11

## ⚠️ Important: Build Requirements

**The .msi installer MUST be built on a Windows machine.** Replit runs on Linux and cannot directly create Windows .msi installers.

## Prerequisites

- Node.js 18+ installed
- Windows 11 (or Windows 10) PC for building
- npm installed
- Your Replit app MUST be published first

## BEFORE YOU BUILD: Publish Your Replit App!

The desktop app connects to your deployed Replit server, so you must publish it first:

1. **In Replit, click the "Publish" button**
2. **Copy your published URL** (e.g., `https://your-project.replit.app`)
3. **Keep this URL** - you'll need it for the build

## Building the Installer

### Option 1: Build on Windows Computer (Easiest)

#### Step 1: Get the Code on Windows

Download your Replit project to your Windows computer:
- Click three dots menu in Replit → "Download as ZIP"
- Extract the ZIP file on your Windows PC

#### Step 2: Install Dependencies

Open PowerShell or Command Prompt in the extracted folder:

```bash
npm install
```

#### Step 3: Update Server URL

Edit `electron/main.js` and replace the placeholder URL:

```javascript
const serverUrl = process.env.SERVER_URL || 'https://YOUR_ACTUAL_URL.replit.app';
```

Change `YOUR_ACTUAL_URL.replit.app` to your published Replit URL.

#### Step 4: Build the Installer

```bash
npx electron-builder --win --config electron-builder.yml
```

#### Step 5: Get Your Installer

The `.msi` file will be created in:
```
dist-electron/CARVI(cu)-Setup-1.0.0.msi
```

File size: Approximately 150-200 MB

### Option 2: Automated Build with GitHub Actions

Create `.github/workflows/build-windows.yml`:

```yaml
name: Build Windows Installer

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npx electron-builder --win --config electron-builder.yml
        env:
          SERVER_URL: ${{ secrets.SERVER_URL }}
      - uses: actions/upload-artifact@v3
        with:
          name: windows-installer
          path: dist-electron/*.msi
```

Then push a tag to trigger the build:
```bash
git tag v1.0.0
git push origin v1.0.0
```

## Distribution Options

After building, distribute the `.msi` file using one of these methods:

### A. Upload to Replit Object Storage (Recommended)

Copy the `.msi` file back to Replit, then run:

```bash
node upload-installer.js
```

This uploads the file and generates a public download link.

### B. GitHub Releases

1. Go to your GitHub repository
2. Click "Releases" → "Create a new release"
3. Upload the `.msi` file
4. Publish the release

Users can download from: `https://github.com/yourusername/repo/releases`

### C. Cloud Storage

Upload to Google Drive, Dropbox, or OneDrive and share the public link.

## Installation Instructions for Users

### How to Install CARVI(cu)

1. **Download** the `.msi` installer file
2. **Double-click** the installer
3. If Windows SmartScreen appears:
   - Click "More info"
   - Click "Run anyway"
4. **Follow the installation wizard**:
   - Choose installation location (default: `C:\Program Files\CARVI(cu)`)
   - Check "Create desktop shortcut"
   - Click "Install"
5. **Launch** from desktop shortcut or Start Menu

### Login Credentials

- **Teacher**: `teacher@gaya.edu` / `password123`
- **Student**: `student@gaya.edu` / `password123`

## How It Works

The desktop app is a **browser wrapper** that connects to your published Replit server:

- ✅ Native Windows application window
- ✅ Desktop shortcuts and start menu integration
- ✅ Professional menu bar with File, Edit, View, Help menus
- ✅ Centralized database (all users access same data)
- ⚠️ **Requires internet connection** to access the server

## Features

✅ **Native Windows Integration**
- Appears in Start Menu as "CARVI(cu) ERP"
- Desktop shortcut
- Windows taskbar integration
- Professional application window

✅ **Professional UI**
- Native window controls
- Full menu bar
- Keyboard shortcuts (Ctrl+R reload, Ctrl+Q quit, F11 fullscreen)
- Single instance protection

✅ **Centralized Data**
- All users connect to same Replit database
- No local database setup needed
- Easy to update (just redeploy Replit app)

## System Requirements

- **OS**: Windows 10/11 (64-bit)
- **RAM**: 4 GB minimum, 8 GB recommended
- **Storage**: 500 MB free space
- **Internet**: Required (connects to Replit server)
- **Display**: 1366x768 minimum

## Troubleshooting

### Build Issues

**"electron-builder not found"**
```bash
npm install -g electron-builder
```

**Build fails on Linux/Mac**
- Use Option 2 (GitHub Actions) with Windows runner
- Or build on a Windows PC

**"Cannot find module"**
```bash
npm install
```

### Runtime Issues

**App shows "Cannot connect to server"**
- Check internet connection
- Verify Replit app is published and running
- Check server URL in `electron/main.js`

**Installer won't run**
- Run as Administrator
- Check Windows Defender/Antivirus
- Ensure enough disk space (500MB+)

## Updating the App

To create a new version:

1. **Update version** in `electron/package.json`:
   ```json
   {
     "version": "1.1.0"
   }
   ```

2. **Rebuild** the installer using the same build steps

3. **Users**: Simply install the new version over the old one
   - Data is safe (stored in cloud)
   - No need to uninstall first

## File Locations

- **Installed App**: `C:\Program Files\CARVI(cu)\`
- **Desktop Shortcut**: Desktop → `CARVI(cu) ERP.lnk`
- **Start Menu**: Start Menu → `CARVI(cu) ERP`

## Configuration

### Change App Icon

Replace `electron/icon.png` with your custom icon (256x256 px recommended)

### Change Window Size

Edit `electron/main.js`:
```javascript
mainWindow = new BrowserWindow({
  width: 1400,    // Adjust width
  height: 900,    // Adjust height
  // ...
});
```

### Change Server URL

Edit `electron/main.js`:
```javascript
const serverUrl = process.env.SERVER_URL || 'https://your-new-url.replit.app';
```

## Notes

- Desktop app is a wrapper around the web application
- All logic runs on the Replit server
- Database is hosted on Replit (PostgreSQL)
- Internet connection required
- Single Replit deployment serves both web and desktop users

---

**System**: CARVI(cu) Enterprise Resource Planning  
**Department**: Gaya College MBA  
**Platform**: Windows 11 Desktop Application  
**Version**: 1.0.0
