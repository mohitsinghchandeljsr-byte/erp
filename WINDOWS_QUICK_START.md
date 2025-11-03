# 🪟 Windows 11 Native App - Quick Start Guide

## For Users (Installing the App)

### Download the App
You will receive one of these files:
- **GayaCollegeERP-Setup-1.0.0.exe** (Recommended - Full Installer)
- **GayaCollegeERP-Portable-1.0.0.exe** (Portable - No Installation)

### Installation Steps

#### Option 1: Full Installer (Recommended)
1. **Double-click** `GayaCollegeERP-Setup-1.0.0.exe`
2. Windows might show a security warning - click **"More info"** then **"Run anyway"**
3. Choose installation location (default: `C:\Program Files\Gaya College ERP`)
4. Click **"Install"**
5. Find the app in:
   - **Start Menu** → "Gaya College ERP"
   - **Desktop** → "Gaya College ERP" shortcut
   - **Installed Apps** (for uninstalling later)

#### Option 2: Portable Version
1. **Copy** `GayaCollegeERP-Portable-1.0.0.exe` to any folder
2. **Double-click** to run
3. No installation needed - perfect for USB drives!

### First Launch
1. **Open** the app from Start Menu or Desktop
2. **Login** with your credentials:
   - Teacher: `teacher@gaya.edu` / `password123`
   - Student: `student@gaya.edu` / `password123`
3. Start using the ERP system!

### Features
✅ Works **offline** (no internet needed after installation)
✅ Native **Windows 11** integration
✅ **Fast** startup and performance
✅ **Secure** local data storage
✅ **Auto-saves** your work

---

## For Developers (Building the App)

### Prerequisites
- Node.js 18+ installed
- npm installed
- Windows 11 PC (for building Windows executable)

### Quick Build Commands

#### 1. Test in Development Mode
```bash
# Terminal 1: Start web server
npm run dev

# Terminal 2: Start Electron app
./scripts/electron-dev.sh
```

#### 2. Build for Windows 11
```bash
# One command to build everything
./scripts/electron-build-win.sh
```

This creates:
- ✅ `GayaCollegeERP-Setup-1.0.0.exe` - Professional installer
- ✅ `GayaCollegeERP-Portable-1.0.0.exe` - Portable version

### File Locations After Build
```
electron-dist/
├── GayaCollegeERP-Setup-1.0.0.exe      (Installer - ~150MB)
├── GayaCollegeERP-Portable-1.0.0.exe   (Portable - ~150MB)
└── win-unpacked/                        (Unpacked files)
```

### Distribution
Share the `.exe` files with users:
- Upload to Google Drive / OneDrive
- Copy to USB drives
- Send via secure file transfer
- Host on internal server

### System Requirements
- **OS**: Windows 11 (64-bit)
- **RAM**: 4GB minimum
- **Storage**: 500MB free space
- **Display**: 1366x768 or higher

### Troubleshooting

#### Build Errors
```bash
# Clean everything and rebuild
rm -rf node_modules electron-dist dist
npm install
./scripts/electron-build-win.sh
```

#### App Won't Start
- Check if another instance is running (Task Manager)
- Run as Administrator
- Check Windows Event Viewer

#### Missing Dependencies
```bash
# Reinstall Electron and builder
npm install electron electron-builder --save-dev
```

### Advanced Configuration

#### Custom Icon
Replace `electron/icon.png` with your own 512x512px PNG

#### Change App Name
Edit `electron-builder.json`:
```json
{
  "productName": "Your Custom Name"
}
```

#### Code Signing (Optional)
For production distribution, add code signing certificate in `electron-builder.json`

---

## Support

For issues or questions:
- Check `BUILD_INSTRUCTIONS.md` for detailed documentation
- Contact: Gaya College MBA IT Department
