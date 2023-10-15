import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExperimentDTO} from 'models';

@Injectable({
  providedIn: 'root'
})
export class ExperimentService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<ExperimentDTO[]>('api/experiment');
 }

  getOne(id: number) {
    return this.http.get<ExperimentDTO>('api/experiment/' + id);
  }

  create(item: ExperimentDTO) {
    return this.http.post<ExperimentDTO>('api/experiment', item);
  }

  update(item: ExperimentDTO) {
    return this.http.put<ExperimentDTO>('api/experiment', item);
  }

  delete(id: number) {
    return this.http.delete('api/experiment/' + id);
  }
}