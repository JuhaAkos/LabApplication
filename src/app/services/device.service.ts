import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeviceDTO } from 'models';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http: HttpClient) { }

  getAll() {
     return this.http.get<DeviceDTO[]>('api/device');
  }

  getOne(id: number) {
    return this.http.get<DeviceDTO>('api/device/' + id);
  }

  create(item: DeviceDTO) {
    return this.http.post<DeviceDTO>('api/device', item);
  }

  update(item: DeviceDTO) {
    return this.http.put<DeviceDTO>('api/device', item);
  }

  delete(id: number) {
    return this.http.delete('api/device/' + id);
  }
}