import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlassContainerDTO } from 'models';

@Injectable({
  providedIn: 'root'
})
export class GlassContainerService {

  constructor(private http: HttpClient) { }

  getAll() {
     return this.http.get<GlassContainerDTO[]>('api/glasscontainer');
  }

  getOne(id: number) {
    return this.http.get<GlassContainerDTO>('api/glasscontainer/' + id);
  }

  create(item: GlassContainerDTO) {
    return this.http.post<GlassContainerDTO>('api/glasscontainer', item);
  }

  update(item: GlassContainerDTO) {
    return this.http.put<GlassContainerDTO>('api/glasscontainer', item);
  }

  delete(id: number) {
    return this.http.delete('api/glasscontainer/' + id);
  }
}