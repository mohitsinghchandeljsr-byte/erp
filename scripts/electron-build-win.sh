#!/bin/bash
# Build for Windows 11

echo "🏗️  Building Gaya College ERP for Windows 11..."
echo ""

# Step 1: Build the web application
echo "📦 Step 1: Building web application..."
npm run build
if [ $? -ne 0 ]; then
  echo "❌ Web build failed!"
  exit 1
fi
echo "✅ Web application built successfully"
echo ""

# Step 2: Package with Electron Builder
echo "🪟 Step 2: Packaging for Windows..."
electron-builder --win --config electron-builder.json
if [ $? -ne 0 ]; then
  echo "❌ Windows packaging failed!"
  exit 1
fi
echo "✅ Windows application packaged successfully"
echo ""

# Show results
echo "🎉 Build complete!"
echo ""
echo "📂 Output files:"
ls -lh electron-dist/*.exe 2>/dev/null || echo "No .exe files found"
echo ""
echo "📋 Installation instructions:"
echo "  1. Installer: electron-dist/GayaCollegeERP-Setup-1.0.0.exe"
echo "  2. Portable: electron-dist/GayaCollegeERP-Portable-1.0.0.exe"
echo ""
echo "🚀 Ready to distribute to Windows 11 users!"
