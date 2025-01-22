import Express from "express";
import { MedicineController } from "../../../application/medicine.controller";
export const MedicineRoutes = () => {
    const router = Express.Router();

    const medicineCtrl = new MedicineController();

    router.post("/medicine", (req,res) => {
        const payload = req.body
        console.log(payload);
        
        medicineCtrl.create(payload).then((result) => {
            const status = result  ? 200 : 400; 
            res.status(status).send(result);
     
        })

        .catch((error) => {
            res.status(500).send(error)
        });

    })


    router.get("/medicine", async (_, response) => {
        try {
            const result = await medicineCtrl.read();
            if (result) {
                response.status(200).json({ message: "lista de medicamentos encontrada", data: result });
            } else {
                response.status(404).json({ message: "Lista de medicamentos no encontrada", data: [] });
            }

        } catch (error: any) {
            response.status(500).send(error.stack)

        }
    })

    router.put("/medicine",(req,res) => {
        const payload = req.body;

        medicineCtrl.update(payload).then((result) =>{
            const status = result !== null ? 200: 400;
            res.status(status).send(result)
        })

        .catch((error) => {
            res.status(500).send(error);
          });
    })

    router.delete("/medicine/:id", async (req,res) =>{
        try{
            const idString = req.params.id;
            const id = parseInt(idString)
            const result = await medicineCtrl.remove(id);
            const status = result? 200:400;
            res.status(status).send(result);
        } catch (error) {
            res.status(500).send(error)
        }
       
    });

    router.delete("/medicine/stock/:id", async (req,res) =>{
        try{
            const idString = req.params.id;
            const id = parseInt(idString)
            const result = await medicineCtrl.removeStock(id);
            const status = result? 200:400;
            res.status(status).send(result);
        } catch (error) {
            res.status(500).send(error)
        }
       
    });

    router.get("/medicine/:id", async (req,res) => {
        try {
            const isdString = req.params.id;
            const id = parseInt(isdString)
            const result = await medicineCtrl.searchById(id);
            const status = result? 200:404;
            res.status(status).send(result);
      
        }catch(error){
            res.status(500).send(error)
        }
    })

    router.get("/medicine/name/:name", async (req,res) => {
        try {
            const name = req.params.name
            const result = await medicineCtrl.searchByName(name);
            const status = result? 200:404;
            res.status(status).send(result);
      
        }catch(error){
            res.status(500).send(error)
        }
    })

    return router;
}