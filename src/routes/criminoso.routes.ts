import { Router } from "express";
import { CriminosoController } from "../controllers/criminoso.controller";
import ArmaController from "../controllers/arma.controller";

const router = Router();
const controller = new CriminosoController()

router.get("/criminoso", controller.list);
router.post("/criminoso", controller.create);
router.delete("/criminoso/:id", controller.delete);
router.put("/criminoso/:id", controller.update);


export default router


