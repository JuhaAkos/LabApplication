import { AppDataSource } from "../data-source";
import { Chemical } from "../entity/Chemical";
import { Controller } from "./base.controller";

export class ChemicalController extends Controller{
    repository = AppDataSource.getRepository(Chemical)
}