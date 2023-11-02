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
  };

  //not used... error causes the user method to be called
  //getall is used instead
  getAdminCalendar = async (req, res) => {
    try {
      if (req.auth.role == "admin") {
        const entities = await this.repository.find();
        res.json(entities);
      }
      
      return this.handleError(res, null, 402, 'Unauthenticated user for this operation.');
    } catch (err) {
      this.handleError(res, err);
    }
  };  
}