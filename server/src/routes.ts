import express  from "express";
import { ChemicalController } from "./controller/chemical.controller";
import { DeviceController } from "./controller/device.controller";
import { MetalToolController } from "./controller/metaltool.controller";
import { WoodenToolController } from "./controller/woodentool.controller";

export function getRoutes() {
    const router = express.Router();

    const chemicalController = new ChemicalController();

    router.get('/chemical', chemicalController.getAll);
    router.get('/chemical/:id', chemicalController.getOne);
    router.post('/chemical/', chemicalController.create);
    router.put('/chemical/', chemicalController.update);
    router.delete('/chemical/:id', chemicalController.delete);

    const deviceController = new DeviceController();

    router.get('/device', deviceController.getAll);
    router.get('/device/:id', deviceController.getOne);
    router.post('/device/', deviceController.create);
    router.put('/device/', deviceController.update);
    router.delete('/device/:id', deviceController.delete);

    const metaltoolController = new MetalToolController();

    router.get('/metaltool', metaltoolController.getAll);
    router.get('/metaltool/:id', metaltoolController.getOne);
    router.post('/metaltool/', metaltoolController.create);
    router.put('/metaltool/', metaltoolController.update);
    router.delete('/metaltool/:id', metaltoolController.delete);

    const woodentoolController = new WoodenToolController();

    router.get('/woodentool', woodentoolController.getAll);
    router.get('/woodentool/:id', woodentoolController.getOne);
    router.post('/woodentool/', woodentoolController.create);
    router.put('/woodentool', woodentoolController.update);
    router.delete('/woodentool/:id', woodentoolController.delete);

    return router;
}