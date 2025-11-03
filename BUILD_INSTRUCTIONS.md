# Building Gaya College ERP for Windows 11

## Prerequisites
- Node.js 18+ installed
- npm installed
- Windows 11 PC for building Windows executable

## Development Mode (Testing)

1. **Start the web server:**
   ```bash
   npm run dev
   ```

2. **In a new terminal, start Electron:**
   ```bash
   npm run electron:dev
   ```

This will open the app in a native window while connected to your development server.

## Production Build for Windows 11

### Step 1: Build the Web Application
```bash
npm run build
```
This creates optimized production files in the `dist/` folder.

### Step 2: Package for Windows
```bash
npm run electron:build:win
```

This creates:
- **NSIS Installer**: `electron-dist/GayaCollegeERP-Setup-1.0.0.exe` (Recommended)
  - Professional installer with options
  - Creates desktop shortcut
  - Adds to Start Menu
  - Uninstaller included

- **Portable Version**: `electron-dist/GayaCollegeERP-Portable-1.0.0.exe`
  - No installation required
  - Run directly from USB or any folder
  - Perfect for testing

### Step 3: Install on Windows 11

#### Option A: NSIS Installer (Recommended)
1. Double-click `GayaCollegeERP-Setup-1.0.0.exe`
2. Follow the installation wizard
3. Choose installation directory
4. Launch from Start Menu or Desktop shortcut

#### Option B: Portable Version
1. Copy `GayaCollegeERP-Portable-1.0.0.exe` anywhere
2. Double-click to run
3. No installation needed

## Features of Windows Native App

✅ **Native Windows Integration**
- Appears in Start Menu
- Desktop shortcut
- Windows taskbar integration
- System tray support

✅ **Offline Capable**
- Runs without internet connection
- Local database support
- Fast startup

✅ **Professional UI**
- Native window controls
- Windows 11 style
- Keyboard shortcuts (Ctrl+R to reload, Ctrl+Q to quit)
- Full menu bar

✅ **Security**
- Single instance (prevents multiple copies)
- Sandboxed environment
- Context isolation enabled

## File Locations

- **Installed App**: `C:\Program Files\Gaya College ERP\`
- **User Data**: `C:\Users\<YourName>\AppData\Roaming\gaya-college-erp\`
- **Desktop Shortcut**: `C:\Users\<YourName>\Desktop\Gaya College ERP.lnk`

## Troubleshooting

### App won't start
- Make sure no other instance is running
- Check Windows Event Viewer for errors
- Try running as Administrator

### Database connection issues
- The app uses local storage
- Check AppData folder for database files
- Ensure proper file permissions

### Build errors
```bash
# Clear cache and rebuild
rm -rf node_modules electron-dist dist
npm install
npm run build
npm run electron:build:win
```

## Distribution

To distribute to other Windows 11 PCs:
1. Share the installer: `GayaCollegeERP-Setup-1.0.0.exe`
2. OR share portable: `GayaCollegeERP-Portable-1.0.0.exe`
3. No additional software required
4. Self-contained application

## System Requirements

- **OS**: Windows 11 (64-bit)
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 500MB free space
- **Display**: 1366x768 minimum, 1920x1080 recommended

## Auto-Updates (Future)

To enable auto-updates in future versions:
1. Set up a release server
2. Configure electron-updater
3. App will check for updates on startup

## Notes

- The app runs in production mode (optimized)
- Development tools are disabled in production build
- All data is stored locally on the PC
- Supports Windows 11 dark/light theme
