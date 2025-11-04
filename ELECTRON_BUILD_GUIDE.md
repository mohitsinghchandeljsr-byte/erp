# CARVI(cu) Desktop Application - Build Guide

This guide explains how to create a Windows .msi installer for the CARVI(cu) ERP system.

## Prerequisites

1. **Node.js** installed (v18 or higher)
2. **Windows OS** (for building .msi files)
3. **Deployed Replit App** - Your app must be published on Replit first

## Important: Publish Your App First!

Before building the desktop app, you MUST publish your Replit app:

1. Click the "Publish" button in Replit
2. Your app will get a URL like: `https://your-project-name.your-username.replit.app`
3. Copy this URL - you'll need it for the build process

## Build Steps

### Option 1: Using the Build Script (Recommended)

#### On Windows:
```bash
# Set your published Replit URL
set SERVER_URL=https://your-project-name.your-username.replit.app

# Run the build script
build-electron.bat
```

#### On Linux/Mac (via Replit Shell):
```bash
# Set your published Replit URL
export SERVER_URL=https://your-project-name.your-username.replit.app

# Make the script executable and run it
chmod +x build-electron.sh
./build-electron.sh
```

### Option 2: Manual Build

1. **Update the server URL** in `electron/main.js`:
   ```javascript
   const serverUrl = process.env.SERVER_URL || 'https://YOUR_ACTUAL_URL.replit.app';
   ```

2. **Run the build command**:
   ```bash
   npx electron-builder --win --config electron-builder.yml
   ```

## After Building

The `.msi` installer will be created in:
```
dist-electron/CARVI(cu)-Setup-1.0.0.msi
```

### File Size
The installer will be approximately **150-200 MB** because it includes:
- Electron runtime
- Chromium browser engine
- Node.js runtime
- All app dependencies

## Distribution

### Option 1: Upload to Replit Object Storage (Recommended)

Use the provided upload script:
```bash
node upload-installer.js
```

This will:
1. Upload the .msi file to your Replit object storage
2. Generate a public download link
3. Display the link for sharing

### Option 2: Upload to Cloud Storage

You can upload the `.msi` file to:
- Google Drive
- Dropbox
- OneDrive
- Your own web server

### Option 3: GitHub Releases

1. Create a GitHub repository for your project
2. Create a new Release
3. Upload the `.msi` file as a release asset
4. Users can download from GitHub Releases page

## Installing the Desktop App

Once users download the `.msi` file:

1. **Double-click** the `.msi` file
2. Follow the installation wizard
3. Choose installation location (default: `C:\Program Files\CARVI(cu)`)
4. The app will create desktop and start menu shortcuts
5. **Launch** CARVI(cu) from the desktop or start menu

## How It Works

The desktop app is a **browser wrapper** that connects to your deployed Replit server:

- **Frontend**: Electron provides a native Windows window
- **Backend**: Connects to your published Replit app
- **Database**: Uses the Replit PostgreSQL database (no local database)
- **Internet Required**: Yes, the app needs internet to connect to the server

## Benefits

✅ Professional Windows application
✅ Native window with menu bar
✅ Desktop shortcut for easy access
✅ Looks and feels like a desktop app
✅ All users share the same database
✅ Easy updates (just redeploy Replit)

## Troubleshooting

### Build Fails with "electron-builder not found"
```bash
npm install -g electron-builder
```

### App shows "Cannot connect to server"
- Check your internet connection
- Verify your Replit app is published and running
- Check the server URL in `electron/main.js`

### .msi installer won't install
- Run as Administrator
- Check Windows Defender / Antivirus
- Make sure you have enough disk space (500MB+)

## Updating the App

To create a new version:

1. Make changes to your Replit app
2. Publish the updated version
3. No need to rebuild the .msi unless you want to change app settings
4. Users will automatically see updates when they launch the app

## Configuration

### Change App Name
Edit `electron-builder.yml`:
```yaml
productName: Your New Name
```

### Change App Icon
Replace `electron/icon.png` with your custom icon (256x256 pixels recommended)

### Change Window Size
Edit `electron/main.js`:
```javascript
mainWindow = new BrowserWindow({
  width: 1400,    // Change width
  height: 900,    // Change height
  // ...
});
```

## Version Control

The current version is `1.0.0`. To update:

1. Edit `electron/package.json`:
   ```json
   {
     "version": "1.1.0"
   }
   ```

2. Rebuild the .msi
3. The filename will reflect the new version

## Support

For issues or questions:
- Check the Replit console for server errors
- Check Windows Event Viewer for installation errors
- Verify your Replit app is published and accessible

---

**Created for:** Gaya College MBA Department
**System:** CARVI(cu) Enterprise Resource Planning
**Version:** 1.0.0
