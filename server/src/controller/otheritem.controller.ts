import { AppDataSource } from "../data-source";
import { OtherItem } from "../entity/OtherItem";
import { Controller } from "./base.controller";

export class OtherItemController extends Controller{
    repository = AppDataSource.getRepository(OtherItem)
}