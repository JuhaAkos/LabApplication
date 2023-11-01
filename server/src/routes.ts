import express  from "express";
import { ChemicalController } from "./controller/chemical.controller";
import { DeviceController } from "./controller/device.controller";
import { MetalToolController } from "./controller/metaltool.controller";
import { WoodenToolController } from "./controller/woodentool.controller";
import { GlassContainerController } from "./controller/glasscontainer.controller";
import { OtherItemController } from "./controller/otheritem.controller";
import { GroupController } from "./controller/group.controller";
import { CalendarController } from "./controller/calendar.controller";
import { UserController } from "./controller/user.controller";
import { ExperimentController } from "./controller/experiment.controller";
import { checkUser, isUserOneOf } from "./protect-routes";

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
    router.post('/device/', checkUser, isUserOneOf([ 'teacher', 'admin' ]), deviceController.create);
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

    const glasscontainerController = new GlassContainerController();

    router.get('/glasscontainer', glasscontainerController.getAll);
    router.get('/glasscontainer/:id', glasscontainerController.getOne);
    router.post('/glasscontainer/', glasscontainerController.create);
    router.put('/glasscontainer', glasscontainerController.update);
    router.delete('/glasscontainer/:id', glasscontainerController.delete);

    const otherItemController = new OtherItemController();

    router.get('/otherItem', otherItemController.getAll);
    router.get('/otherItem/:id', otherItemController.getOne);
    router.post('/otherItem/', otherItemController.create);
    router.put('/otherItem', otherItemController.update);
    router.delete('/otherItem/:id', otherItemController.delete);





    const groupController = new GroupController();

    router.get('/group', groupController.getAll);
    router.get('/group/:id', groupController.getOne);
    router.post('/group/', groupController.create);
    router.put('/group', groupController.update);
    router.delete('/group/:id', groupController.delete);

    const calendarController = new CalendarController();

    router.get('/calendar', calendarController.getAll);
    router.get('/calendar/own', checkUser, isUserOneOf([ 'teacher', 'admin' ]), calendarController.getUserCalendar);
    router.get('/calendar/:id', calendarController.getOne);
    router.post('/calendar/', calendarController.create);
    router.put('/calendar', calendarController.update);
    router.delete('/calendar/:id', calendarController.delete);

    const userController = new UserController();

    router.get('/user', userController.getAll);
    router.get('/user/:id', userController.getOne);
    router.post('/user', userController.create);
    //check use 1
    router.put('/user', checkUser, userController.update);
    //check use 2
    router.delete('/user/:id', checkUser, userController.delete);
    
    router.post('/user/login', userController.login);

    const experimentController = new ExperimentController();

    router.get('/experiment', experimentController.getAll);
    router.get('/experiment/:id', experimentController.getOne);
    router.post('/experiment/', experimentController.create);
    router.put('/experiment', experimentController.update);
    router.delete('/experiment/:id', experimentController.delete);

    
    
    return router;
}