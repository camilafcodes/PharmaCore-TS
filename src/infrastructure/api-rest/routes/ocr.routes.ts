import Express, {Request} from "express";
import { OcrService } from "../../services/ocrService";
import multer from "multer";
import fs from "fs";


export const ocrRoutes = () => {
    const router = Express.Router();
    const ocrService = new OcrService();
    
    const uploadPdf = multer({ dest: 'pdfs/' });
    const storage = multer.memoryStorage();
    const uploadImg = multer({ storage });

    router.post("/images", uploadImg.single('image'), async (req:Request, res) => {
        const filePath = req.file?.buffer;
        if (!filePath) {
            res.status(400).json({ message: "File not found" });
            return;
        }
    
        try {
            const data = await ocrService.createImage(filePath);
            res.status(200).json(data);
        } catch (error) {
            console.error("Error creating image:", error);
            res.status(500).json({ message: "Error creating image" });
        }
    });
    
    router.post("/pdf", uploadPdf.single('pdf'), async (req:Request, res) => {
        const filePath = req.file?.path;

        if (!filePath) {
            res.status(400).json({ message: "File not found" });
            return;
        }
        const pdfBuffer = fs.readFileSync(filePath)

    
        try {
            const data = await ocrService.createPdf(pdfBuffer);
            res.status(200).json(data);
        } catch (error) {
            console.error("Error creating PDF:", error);
            res.status(500).json({ message: "Error creating PDF" });
        }
    });
    
    return router
}