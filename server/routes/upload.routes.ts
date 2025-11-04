import { Router } from "express";
import multer from "multer";
import { authenticate, type AuthRequest } from "../middleware/auth";
import { ObjectStorageService } from "../objectStorage";

const router = Router();
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

router.post("/", authenticate, upload.single("file"), async (req: AuthRequest, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file provided" });
    }

    const { path } = req.body;
    if (!path) {
      return res.status(400).json({ message: "No path provided" });
    }

    // Upload to object storage
    const objectStorageService = new ObjectStorageService();
    await objectStorageService.uploadFile(path, req.file.buffer);

    // Generate public URL
    const url = `/public-objects/${path.split("/").slice(2).join("/")}`;

    res.json({ url, path });
  } catch (error: any) {
    console.error("Upload error:", error);
    res.status(500).json({ message: error.message || "Failed to upload file" });
  }
});

export default router;
