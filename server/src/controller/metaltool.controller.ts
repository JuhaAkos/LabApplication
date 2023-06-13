import { AppDataSource } from "../data-source";
import { MetalTool } from "../entity/MetalTool";
import { Controller } from "./base.controller";

export class MetalToolController extends Controller{
    repository = AppDataSource.getRepository(MetalTool)
}