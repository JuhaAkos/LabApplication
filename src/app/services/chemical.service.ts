import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChemicalDTO } from 'models';

@Injectable({
  providedIn: 'root'
})
export class ChemicalService {

  constructor(private http: HttpClient) { }

  getAll() {
     return this.http.get<ChemicalDTO[]>('api/chemical');
  }

  getOne(id: number) {
    return this.http.get<ChemicalDTO>('api/chemical/' + id);
  }

  create(item: ChemicalDTO) {
    return this.http.post<ChemicalDTO>('api/chemical', item);
  }

  update(item: ChemicalDTO) {
    return this.http.put<ChemicalDTO>('api/chemical', item);
  }

  delete(id: number) {
    return this.http.delete('api/chemical/' + id);
  }
}