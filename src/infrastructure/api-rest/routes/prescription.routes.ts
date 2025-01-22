import Express from "express";
import { PrescriptionController } from "../../../application/prescription.controller";

export const prescriptionRoutes = () => {
    const router = Express.Router();

    const prescripcionCtrl = new PrescriptionController();
    router.get("/prescriptions", async (_, response) => {
        try {
            const result = await prescripcionCtrl.read();
            if (result) {
                response.status(200).json({ message: "lista de recetas encontrada", data: result });
            } else {
                response.status(404).json({ message: "Lista de recetas no encontrada", data: [] });
            }

        } catch (error) {
            response.status(500).send(error)

        }

    })

    router.post("/prescriptions", async (request, response) => {
        prescripcionCtrl.create(request.body).then(result => {
            if (result) {
                response.status(201).json({ message: "Receta creada", data: result });
            } else {
                response.status(400).json({ message: "Receta no creada", data: [] });
            }
        }
        ).catch(error => {
            response.status(500).send(error)
        })

    })

    router.put("/prescriptions", async (request, response) => {
        try {
            const result = await prescripcionCtrl.update(request.body);
            if (result) {
                response.status(200).json({ message: "Receta actualizada", data: result });
            } else {
                response.status(400).json({ message: "Receta no actualizada", data: [] });
            }

        } catch (error) {
            response.status(500).send(error)

        }

    })

    router.delete("/prescriptions/:id", async (request, response) => {
        try {
            const result = await prescripcionCtrl.remove(Number(request.params.id));
            if (result) {
                response.status(200).json({ message: "Receta eliminada", data: [] });
            }
            else {
                response.status(400).json({ message: "Receta no eliminada", data: [] });
            }

        } catch (error) {
            response.status(500).send(error)

        }

    })

    router.get("/prescriptions/:id", async (request, response) => {
        try {
            const result = await prescripcionCtrl.searchById(Number(request.params.id));
            if (result) {
                response.status(200).json({ message: "Receta encontrada", data: result });
            }
            else {
                response.status(404).json({ message: "Receta no encontrada", data: [] });
            }

        } catch (error) {
            response.status(500).send(error)

        }

    })

    return router;
}