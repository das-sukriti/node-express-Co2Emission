import express from "express";
import controller from "./controller";
const router = express.Router();


router.get('/api/co2Calculater/start/:start/end/:end/transportation/:transportation', controller.getEmission);

router.get('/', controller.getTest);

export = router;