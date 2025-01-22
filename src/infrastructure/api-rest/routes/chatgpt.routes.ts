import Express, { Request, Router } from "express";
import { ChatgptService } from "../../services/chatgptService";

export const chatgptRoutes = () => {
    const router = Express.Router();
    const chatgptService = new ChatgptService();
    
    router.post("/chatgpt", async (req:Request, res) => {
        const { question, productContext } = req.body;
    
        try {
            const data = await chatgptService.sendReportByEmail(question, productContext);
            res.status(200).json(data);
        } catch (error) {
            console.error("Error creating chatgpt:", error);
            res.status(500).json({ message: "Error creating chatgpt" });
        }
    });
    
    return router
}