
import express from 'express'
import { routes } from './src/infrastructure/api-rest/routes/index.routes';
import middleware404 from './src/infrastructure/api-rest/middlewares/middlewares';
import cors from 'cors'

const main = () => {

    const app = express()
    app.use(cors())
    app.use(express.json())
    
    app.get("/", (_, res) => {
        res.send({ message: "Bienvenido a la API " });
    });
 
  console.log("hostttttt",process.env)

    app.use("/api/v1", routes())
    app.use(middleware404);

    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
        console.log(`Servidor Api-Rest ejecutando: http://localhost:${PORT}`);
    })
}

main()