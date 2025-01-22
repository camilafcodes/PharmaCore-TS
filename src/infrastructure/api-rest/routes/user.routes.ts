import  Express, { Router }  from "express";
import { UserCtrl } from "../../../application/user.controller";
import swaggerIu from "swagger-ui-express"
import { swaggerOptions } from "../../../../docs/swagger";



export const userRoutes = () => {
    const router = Express.Router();
    
    const userCrontroller = new UserCtrl();

    router.use("/users/docs",swaggerIu.serve, swaggerIu.setup(swaggerOptions))
   
    router.post("/users", (req,res) => {
        const payload = req.body
        userCrontroller.create(payload).then((result) => {
            const status = result  ? 200 : 400; 
            res.status(status).send(result);
     
        })

        .catch((error) => {
            res.status(500).send(error.message)
        });

    })

    router.put("/users",(req,res) => {
        const payload = req.body;

        userCrontroller.update(payload).then((result) =>{ 
            const status = result !== null ? 200: 400;
            res.status(status).send(result)
        })

        .catch((error) => {      
            res.status(500).send(error.message);
          });
    })

    router.get("/users", async ( _, res) => {
        try {
            const result = await userCrontroller.read();
            const status = result? 200:400;
            res.status(status).send(result)
        
        } catch (error) {
            res.status(500).send(error)
         
        }

    })
    

    router.delete("/users/:id", async (req,res) =>{
        try{
            const idString = req.params.id; 
            const id = parseInt(idString)
            const result = await userCrontroller.remove(id);
            const status = result? 200:400;
            res.status(status).send(result);
        } catch (error) {
            res.status(500).send(error)
        }
       
    });

    router.get("/users/:id", async (req,res) => {
        try {
            const isdString = req.params.id;
            const id = parseInt(isdString)
            const result = await userCrontroller.searchById(id);
            const status = result? 200:404;
            res.status(status).send(result);
      
        }catch(error){
            res.status(500).send(error)
        }
       

       

    })

    return router
}
