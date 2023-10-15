import { AppDataSource } from "../data-source";
import { Experiment } from "../entity/Experiment";
import { Controller } from "./base.controller";

export class ExperimentController extends Controller{
    repository = AppDataSource.getRepository(Experiment)
}