import { Router } from "express";
import { PatientController } from "../../../application/patient.controller";

export const patientRoutes = () => {
  const router = Router();
  const patientController = new PatientController();

  router.post("/patient", async (req, res) => {
    try {
        const payload = req.body;
        console.log(payload);

        const result = await patientController.create(payload);

        if (result) {
            res.status(200).json({
                message: "Paciente creado exitosamente.",
                data: result
            });
        } else {
            res.status(400).json({
                message: "Error al crear el paciente. Verifique los datos enviados."
            });
        }
    } catch (error) {
        console.error("Error interno:", error);
        res.status(500).json({
            message: "Error interno del servidor."
        });
    }
});




router.get("/patient", async (_, response) => {
    try {
        const result = await patientController.read();
        response.send(result);
    } catch (error) {
        response.status(500).send(error)
    }
})

router.put("/patient",(req,res) => {
    const payload = req.body;

    patientController.update(payload).then((result) =>{
        if(result){
            res.status(201).json({message:"paciente actualizado", data: result});
        } else {
            res.status(404).send("No se encontro el paciente");
        }
    })
    .catch((error) => {
        res.status(500).send(error);
      });
})

router.delete("/patient/:id", async (req,res) =>{
    try{
        const idString = req.params.id;
        const id = parseInt(idString)
        const result = await patientController.remove(id);
        if(result){
            res.status(200).send("paciente eliminado");
        } else {
            res.status(404).send("No se encontro el patiente");
        }
    } catch (error) {
        res.status(500).send(error)
    }
   
});

router.get("/patient/:id", async (req,res) => {
    try {
        const isdString = req.params.id;
        const id = parseInt(isdString)
        const result = await patientController.searchById(id);
        const status = result? 200:404;
        res.status(status).send(result);
  
    }catch(error){
        res.status(500).send(error)
    }
})

  return router;
};