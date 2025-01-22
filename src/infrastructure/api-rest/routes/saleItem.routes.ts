import Express from "express";
import { SaleItemController } from "../../../application/saleItem.controller";



export const saleItemRoutes = () => {
    const router = Express.Router();

    const saleItemsCtrl = new SaleItemController();

    router.post("/sale_items", (request, response) => {
        const payload = request.body;
        saleItemsCtrl.create(payload)
            .then((result) => {
                response.status(200).send(result);
            })
            .catch((error) => {
                response.status(500).send(error);
            });
    })

    router.get("/sale_items", async (_, response) => {
        try {
            const result = await saleItemsCtrl.read();
            response.send(result);

        } catch (error) {
            response.status(500).send(error)

        }
    })

    router.get("/sale_items/:id", async (req, res) => {

        const idString = req.params.id;
        const id = parseInt(idString);
        try {
            const result = await saleItemsCtrl.searchById(id);
            res.send(result);
        } catch (error) {
            res.status(500).send(error)
        }

    })

    router.delete("/sale_items/:id", async (req, res) => {
        try {
            const idString = req.params.id;
            const id = parseInt(idString);
            const result = await saleItemsCtrl.remove(id);
            res.send(result);

        } catch (error) {
            res.status(500).send(error)
        }
    })


    router.put("/sale_items", (req, res) => {

        const payload = req.body;
        saleItemsCtrl.update(payload)
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((error) => {
                res.status(500).send(error);
            });

    })



    return router;
}