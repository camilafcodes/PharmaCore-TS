import Express from 'express';
import { PrescriptionItemController } from "../../../application/prescriptionItem.controller";

export const prescriptionItemRoutes = () => {
    const router = Express.Router();

    const prescriptionItemCtrl = new PrescriptionItemController();
    router.get("/prescriptionitems", async (_, response) => {
        try {
            const result = await prescriptionItemCtrl.read();
            if (result) {
                response.status(200).json({ message: "Lista de detalles de recetas encontrada", data: result });
            }
            else {
                response.status(404).json({ message: "Lista de detalles de recetas no encontrada", data: [] });
            }
        } catch (error) {
            response.status(500).send(error)
        }
    })

    router.post("/prescriptionitems", async (request, response) => {
        prescriptionItemCtrl.create(request.body).then(result => {
            if (result) {
                response.status(201).json({ message: "Detalle de receta creado", data: result });
            }
            else {
                response.status(400).json({ message: "Detalle de receta no creado", data: [] });
            }
        }).catch(error => {
            response.status(500).send(error)
        })
    })

    router.put("/prescriptionitems", async (request, response) => {
        try {
            const result = await prescriptionItemCtrl.update(request.body);
            if (result) {
                response.status(200).json({ message: "Detalle de receta actualizado", data: result });
            }
            else {
                response.status(400).json({ message: "Detalle de receta no actualizado", data: [] });
            }
        } catch (error) {
            response.status(500).send(error)
        }
    })

    router.delete("/prescriptionitems/:id", async (request, response) => {
        try {
            const result = await prescriptionItemCtrl.remove(Number(request.params.id));
            if (result) {
                response.status(200).json({ message: "Detalle de receta eliminado", data: [] });
            }
            else {
                response.status(400).json({ message: "Detalle de receta no eliminado", data: [] });
            }
        } catch (error) {
            response.status(500).send(error)
        }
    })

    router.get("/prescriptionitems/:id", async (request, response) => {
        try {
            const result = await prescriptionItemCtrl.searchById(Number(request.params.id));
            if (result) {
                response.status(200).json({ message: "Detalle de receta encontrado", data: result });
            }
            else {
                response.status(404).json({ message: "Detalle de receta no encontrado", data: [] });
            }
        } catch (error) {
            response.status(500).send(error)
        }
    })

    return router;
}