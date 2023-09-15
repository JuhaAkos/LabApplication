import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OtherItemDTO } from 'models';

@Injectable({
  providedIn: 'root'
})
export class OtherItemService {

  constructor(private http: HttpClient) { }

  getAll() {
     return this.http.get<OtherItemDTO[]>('api/otheritem');
  }

  getOne(id: number) {
    return this.http.get<OtherItemDTO>('api/otheritem/' + id);
  }

  create(item: OtherItemDTO) {
    return this.http.post<OtherItemDTO>('api/otheritem', item);
  }

  update(item: OtherItemDTO) {
    return this.http.put<OtherItemDTO>('api/otheritem', item);
  }

  delete(id: number) {
    return this.http.delete('api/otheritem/' + id);
  }
}