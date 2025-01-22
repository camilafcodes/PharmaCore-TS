import Express from "express";
import { SaleController } from "../../../application/sale.controller";
import swaggerIu from "swagger-ui-express"
import { swaggerOptions } from "../../../../docs/swagger";
export const saleRoutes = () => {
    const router = Express.Router();

    const salesCtrl = new SaleController();

    router.use("/sales/docs", swaggerIu.serve, swaggerIu.setup(swaggerOptions))

    router.post("/sales", (request, response) => {
        const payload = request.body;
        salesCtrl.create(payload)
            .then((result) => {
                response.status(200).send(result);
            })
            .catch((error) => {
                response.status(500).send(error);
            });
    })

    router.get("/sales", async (_, response) => {
        try {
            const result = await salesCtrl.read();
            response.send(result);

        } catch (error) {
            response.status(500).send(error)

        }
    })

    router.get("/sales/:id", async (req, res) => {

        const idString = req.params.id;
        const id = parseInt(idString);
        try {
            const result = await salesCtrl.searchById(id);
            res.send(result);
        } catch (error) {
            res.status(500).send(error)
        }

    })

    router.delete("/sales/:id", async (req, res) => {
        try {
            const idString = req.params.id;
            const id = parseInt(idString);
            const result = await salesCtrl.remove(id);
            res.send(result);

        } catch (error) {
            res.status(500).send(error)
        }
    })


    router.put("/sales", (req, res) => {

        const payload = req.body;
        salesCtrl.update(payload)
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((error) => {
                res.status(500).send(error);
            });

    })
    return router;
}