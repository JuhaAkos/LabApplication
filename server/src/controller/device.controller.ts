import { AppDataSource } from "../data-source";
import { Device } from "../entity/Device";
import { Controller } from "./base.controller";

export class DeviceController extends Controller{
    repository = AppDataSource.getRepository(Device)
}