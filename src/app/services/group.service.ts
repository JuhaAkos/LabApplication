import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GroupDTO } from 'models';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  getAll() {
     return this.http.get<GroupDTO[]>('api/group');
  }

  getOne(id: number) {
    return this.http.get<GroupDTO>('api/group/' + id);
  }

  create(item: GroupDTO) {
    return this.http.post<GroupDTO>('api/group', item);
  }

  update(item: GroupDTO) {
    return this.http.put<GroupDTO>('api/group', item);
  }

  delete(id: number) {
    return this.http.delete('api/group/' + id);
  }
}