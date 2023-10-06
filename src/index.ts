import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import armaRoutes from "./routes/arma.routes";
import criminosoRoutes from "./routes/criminoso.routes";
import crimeRoutes from "./routes/crime.routes";

dotenv.config();

const app = express();
app.use(cors())
app.use(express.json());
app.use(armaRoutes)
app.use(criminosoRoutes)
app.use(crimeRoutes)

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`rodando na porta: ${port}`);
});

app.get("/", (req: Request, resp: Response) => {
  return resp.status(200).send({ sucess: true, message: "Api-Delegacia" })
})
