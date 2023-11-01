import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CalendarDTO } from 'models';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http: HttpClient) { }

  getAll() {
     return this.http.get<CalendarDTO[]>('api/calendar');
  }

  getOne(id: number) {
    return this.http.get<CalendarDTO>('api/calendar/' + id);
  }

  create(item: CalendarDTO) {
    return this.http.post<CalendarDTO>('api/calendar', item);
  }

  update(item: CalendarDTO) {
    return this.http.put<CalendarDTO>('api/calendar', item);
  }

  delete(id: number) {
    return this.http.delete('api/calendar/' + id);
  }

  getUserCalendar() {
    return this.http.get<CalendarDTO[]>('api/calendar/own');    
  }
}