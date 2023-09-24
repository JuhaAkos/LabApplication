import { AppDataSource } from "../data-source";
import { Calendar } from "../entity/Calendar";
import { Controller } from "./base.controller";

export class CalendarController extends Controller{
    repository = AppDataSource.getRepository(Calendar)
}