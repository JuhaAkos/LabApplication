import { AppDataSource } from "../data-source";
import { GlassContainer } from "../entity/GlassContainer";
import { Controller } from "./base.controller";

export class GlassContainerController extends Controller{
    repository = AppDataSource.getRepository(GlassContainer)
}