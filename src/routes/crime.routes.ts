import { Router } from "express";
import { CrimeController } from "../controllers/crime.controller";

const router = Router()
const controller = new CrimeController()

router.get("/crime", controller.list)
router.post("/crime", controller.create)
router.delete('/crime/:id', controller.delete)
router.put("/crime/:id", controller.update)

router.get("/:idCriminoso/criminoso", controller.listCrimeCriminoso)
router.get("/:idCrime/arma", controller.listArmaCrime)

export default router