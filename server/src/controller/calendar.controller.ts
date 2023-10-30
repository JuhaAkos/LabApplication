import { createQueryBuilder } from "typeorm";
import { UserDTO } from "../../../models";
import { AppDataSource } from "../data-source";
import { Calendar } from "../entity/Calendar";
import { Controller } from "./base.controller";

export class CalendarController extends Controller {
  repository = AppDataSource.getRepository(Calendar);


  async getUserCalendar(req, res) {
    
    const teacherId = req.params.id;

    const userCalendars = await this.repository      
      .createQueryBuilder("calendar")      
      .select("calendar")
      .from(Calendar, "calendar")      
      .where("calendar.id = :tId", { tId: 5})
      .getMany();
    
    
    console.log("a:" + userCalendars)
    res.json(userCalendars);    
  }

}