import  Express  from "express";
import { doctorController } from "../../../application/doctor.controller";

export const doctorRoutes = () => {
    const router = Express.Router();
    
    const doctorCtrl = new doctorController();


    router.post("/doctors",(req,res) => {
        const payload = req.body
        doctorCtrl.create(payload).then((result)=>{
            const status = result? 200:400;
            res.status(status).send(result)
        })
        .catch((error)=>{
            res.status(500).send(error)
        })


    })

    
    router.get("/doctors", async ( _, res) => {
        try {
            const result = await doctorCtrl.read();
            const status = result? 200:400;
            res.status(status).send(result);
            
        } catch (error) {
            res.status(500).send(error)
            
        }

    })

    router.put("/doctors", (req,res) => {
        const payload = req.body;
        doctorCtrl.update(payload).then((result) => {
            const status = result !== null ? 200: 400;
            res.status(status).send(result)

        })

        .catch((error) => {
            res.status(500).send(error);
          });
    })

    router.delete("/doctors/:id", async (req,res) => {
        try{
            const idString = req.params.id;
            const id = parseInt(idString)
            const result = await doctorCtrl.remove(id)
            const status = result? 200:400;
            res.status(status).send(result);
        } catch (error) {
            res.status(500).send(error)
        }
    });

    router.get("/doctors/:id", async (req,res)=> {

        try{

            const idString = req.params.id;
            const id = parseInt(idString)
            const result = await doctorCtrl.searchById(id);
            const status = result? 200:404;
            res.status(status).send(result);
            
        } catch (error) {
            res.status(500).send(error)
        }
    })

    return router;
}