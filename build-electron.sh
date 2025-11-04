#!/bin/bash

# CARVI(cu) Electron Desktop App Builder
# This script builds the Windows .msi installer

echo "=================================="
echo "CARVI(cu) Desktop App Builder"
echo "=================================="
echo ""

# Check if SERVER_URL is set
if [ -z "$SERVER_URL" ]; then
    echo "⚠️  WARNING: SERVER_URL not set!"
    echo "Please set your deployed Replit URL:"
    echo "export SERVER_URL=https://your-app.replit.app"
    echo ""
    read -p "Enter your Replit app URL (or press Enter to use placeholder): " input_url
    if [ ! -z "$input_url" ]; then
        export SERVER_URL="$input_url"
        echo "✓ SERVER_URL set to: $SERVER_URL"
    else
        echo "⚠️  Using placeholder URL - you'll need to update electron/main.js manually"
    fi
fi

# Update electron/main.js with the SERVER_URL
if [ ! -z "$SERVER_URL" ]; then
    echo "📝 Updating electron/main.js with server URL..."
    sed -i "s|https://YOUR_REPLIT_URL.replit.app|$SERVER_URL|g" electron/main.js
    echo "✓ Server URL updated"
fi

echo ""
echo "🔨 Building Electron app for Windows..."
echo ""

# Build the .msi installer
npx electron-builder --win --config electron-builder.yml

if [ $? -eq 0 ]; then
    echo ""
    echo "=================================="
    echo "✅ Build completed successfully!"
    echo "=================================="
    echo ""
    echo "Your .msi installer is ready at:"
    echo "📦 dist-electron/CARVI(cu)-Setup-1.0.0.msi"
    echo ""
    echo "File size:"
    ls -lh dist-electron/*.msi 2>/dev/null | awk '{print "   " $5 " - " $9}'
    echo ""
else
    echo ""
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi
