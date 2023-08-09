import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class TransferService {

  constructor(
    private router:Router,
  ) { }

  private data: String = '';

  setData(data: String){
    this.data = data;
  }

  getData(){
    return this.data;
  }

  clearData(){
    this.data = "";
  }

}