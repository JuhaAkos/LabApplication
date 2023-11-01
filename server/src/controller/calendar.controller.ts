import { createQueryBuilder } from "typeorm";
import { UserDTO } from "../../../models";
import { AppDataSource } from "../data-source";
import { Calendar } from "../entity/Calendar";
import { Controller } from "./base.controller";

export class CalendarController extends Controller {
  repository = AppDataSource.getRepository(Calendar);

  getUserCalendar = async (req, res) => {
    try {
      const teacherId = req.auth.id;

      const userCalendars = await this.repository.findBy({
        teacher: { id: teacherId }
      });
      
      res.json(userCalendars);
    }
    catch (err) {
      this.handleError(res, err, 500);
    }
  }

}