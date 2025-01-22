import Express from "express";
import { ReportOptions } from "../../../domain/models/ReportOptions";
import { saleReceiptController } from "../../../application/saleReceipt.controller";
export const notificacionesRoutes = () => {

        const router = Express.Router();
        const ctrl = new saleReceiptController();

        router.post("/notificacion/correo/:id", async (req, res) => {
            try {
                const options: ReportOptions = {
                  
                    to: req.body.to?.toString(),
                }
                const id = parseInt(req.params.id);
                const result = await ctrl.createReciptById(id, options);
                res.status(200).send(result);
            } catch (error) {
                res.status(500).send(
                    {ok: false, message: "Error al enviar el correo", error}
                )
            }   
        })
        return router;
            
}