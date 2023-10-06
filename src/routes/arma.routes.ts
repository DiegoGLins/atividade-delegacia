import { Router } from "express";
import ArmaController from "../controllers/arma.controller";


const router = Router()
const controller = new ArmaController()

router.get("/arma", controller.list)
router.post("/arma/:idCrime/:idCriminoso", controller.create)
router.delete("/arma/:idArma", controller.delete)
router.put("/arma/:idArma", controller.update)

export default router
