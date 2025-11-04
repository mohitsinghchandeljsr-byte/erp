import { Storage } from '@google-cloud/storage';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const BUCKET_ID = process.env.DEFAULT_OBJECT_STORAGE_BUCKET_ID;
const PUBLIC_DIR = 'public';
const INSTALLER_FILE = 'CARVI(cu)-Setup-1.0.0.msi';
const LOCAL_PATH = path.join(__dirname, 'dist-electron', INSTALLER_FILE);

if (!BUCKET_ID) {
  console.error('❌ Error: DEFAULT_OBJECT_STORAGE_BUCKET_ID not found in environment');
  console.error('   Object storage is not configured.');
  process.exit(1);
}

async function uploadInstaller() {
  try {
    console.log('================================');
    console.log('CARVI(cu) Installer Upload');
    console.log('================================');
    console.log('');

    // Check if installer file exists
    if (!fs.existsSync(LOCAL_PATH)) {
      console.error(`❌ Error: Installer file not found at: ${LOCAL_PATH}`);
      console.error('   Please build the installer first using: ./build-electron.sh');
      process.exit(1);
    }

    const stats = fs.statSync(LOCAL_PATH);
    const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    console.log(`📦 Found installer: ${INSTALLER_FILE}`);
    console.log(`📊 File size: ${fileSizeMB} MB`);
    console.log('');

    // Initialize storage
    console.log('🔧 Initializing Google Cloud Storage...');
    const storage = new Storage();
    const bucket = storage.bucket(BUCKET_ID);

    // Upload file to public directory
    const destinationPath = `${PUBLIC_DIR}/${INSTALLER_FILE}`;
    console.log(`📤 Uploading to: ${destinationPath}`);
    console.log('   This may take a few minutes...');
    console.log('');

    await bucket.upload(LOCAL_PATH, {
      destination: destinationPath,
      metadata: {
        contentType: 'application/x-msi',
        cacheControl: 'public, max-age=31536000',
      },
      public: true,
    });

    console.log('✅ Upload completed!');
    console.log('');

    // Get public URL
    const file = bucket.file(destinationPath);
    const [metadata] = await file.getMetadata();
    const publicUrl = `https://storage.googleapis.com/${BUCKET_ID}/${destinationPath}`;

    console.log('================================');
    console.log('🎉 Success!');
    console.log('================================');
    console.log('');
    console.log('Your installer is now available at:');
    console.log('');
    console.log(`🔗 ${publicUrl}`);
    console.log('');
    console.log('Share this link with users to download and install CARVI(cu)!');
    console.log('');
    console.log('Installation instructions:');
    console.log('1. Click the link above to download the installer');
    console.log('2. Run the downloaded .msi file');
    console.log('3. Follow the installation wizard');
    console.log('4. Launch CARVI(cu) from the desktop or start menu');
    console.log('');

    // Save URL to a file for reference
    const urlFilePath = path.join(__dirname, 'installer-download-link.txt');
    fs.writeFileSync(urlFilePath, publicUrl);
    console.log(`📝 Download link saved to: installer-download-link.txt`);
    console.log('');

  } catch (error) {
    console.error('');
    console.error('❌ Upload failed:');
    console.error(error.message);
    console.error('');
    process.exit(1);
  }
}

uploadInstaller();
