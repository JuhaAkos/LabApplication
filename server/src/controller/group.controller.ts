import { AppDataSource } from "../data-source";
import { Group } from "../entity/Group";
import { Controller } from "./base.controller";

export class GroupController extends Controller{
    repository = AppDataSource.getRepository(Group)

}