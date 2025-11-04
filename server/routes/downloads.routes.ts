import { Router } from "express";
import { Storage } from "@google-cloud/storage";

const router = Router();

const BUCKET_ID = process.env.DEFAULT_OBJECT_STORAGE_BUCKET_ID;
const INSTALLER_FILE = "public/CARVI(cu)-Setup-1.0.0.msi";

// Download the Windows installer
router.get("/installer", async (req, res) => {
  try {
    if (!BUCKET_ID) {
      return res.status(503).json({ 
        message: "Object storage not configured. Please contact administrator." 
      });
    }

    const storage = new Storage();
    const bucket = storage.bucket(BUCKET_ID);
    const file = bucket.file(INSTALLER_FILE);

    // Check if file exists
    const [exists] = await file.exists();
    if (!exists) {
      return res.status(404).json({ 
        message: "Installer not available yet. Please contact administrator to build and upload the installer." 
      });
    }

    // Get file metadata
    const [metadata] = await file.getMetadata();
    
    // Set response headers for download
    res.setHeader('Content-Type', 'application/x-msi');
    res.setHeader('Content-Disposition', 'attachment; filename="CARVI(cu)-Setup-1.0.0.msi"');
    res.setHeader('Content-Length', metadata.size || '0');

    // Stream the file to the response
    const readStream = file.createReadStream();
    
    readStream.on('error', (error) => {
      console.error('Error streaming file:', error);
      if (!res.headersSent) {
        res.status(500).json({ message: "Error downloading installer" });
      }
    });

    readStream.pipe(res);
  } catch (error: any) {
    console.error("Error downloading installer:", error);
    res.status(500).json({ message: "Failed to download installer" });
  }
});

export default router;
