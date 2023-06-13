import { AppDataSource } from "../data-source";
import { WoodenTool } from "../entity/WoodenTool";
import { Controller } from "./base.controller";

export class WoodenToolController extends Controller{
    repository = AppDataSource.getRepository(WoodenTool)
}