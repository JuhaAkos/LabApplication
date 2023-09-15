import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WoodenToolDTO } from 'models';

@Injectable({
  providedIn: 'root'
})
export class WoodenToolService {

  constructor(private http: HttpClient) { }

  getAll() {
     return this.http.get<WoodenToolDTO[]>('api/woodentool');
  }

  getOne(id: number) {
    return this.http.get<WoodenToolDTO>('api/woodentool/' + id);
  }

  create(item: WoodenToolDTO) {
    return this.http.post<WoodenToolDTO>('api/woodentool', item);
  }

  update(item: WoodenToolDTO) {
    return this.http.put<WoodenToolDTO>('api/woodentool', item);
  }

  delete(id: number) {
    return this.http.delete('api/woodentool/' + id);
  }
}