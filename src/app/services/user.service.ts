import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDTO } from 'models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll() {
     return this.http.get<UserDTO[]>('api/user');
  }

  getOne(id: number) {
    return this.http.get<UserDTO>('api/user/' + id);
  }

  create(item: UserDTO) {
    return this.http.post<UserDTO>('api/user', item);
  }

  update(item: UserDTO) {
    return this.http.put<UserDTO>('api/user', item);
  }

  delete(id: number) {
    return this.http.delete('api/user/' + id);
  }
}