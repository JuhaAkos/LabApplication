import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MetalToolDTO } from 'models';

@Injectable({
  providedIn: 'root'
})
export class MetalToolService {

  constructor(private http: HttpClient) { }

  getAll() {
     return this.http.get<MetalToolDTO[]>('api/metaltool');
  }

  getOne(id: number) {
    return this.http.get<MetalToolDTO>('api/metaltool/' + id);
  }

  create(item: MetalToolDTO) {
    return this.http.post<MetalToolDTO>('api/metaltool', item);
  }

  update(item: MetalToolDTO) {
    return this.http.put<MetalToolDTO>('api/metaltool', item);
  }

  delete(id: number) {
    return this.http.delete('api/metaltool/' + id);
  }
}