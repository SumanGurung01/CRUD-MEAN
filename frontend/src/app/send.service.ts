import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SendService {

  readonly url = "http://localhost:3000"
  constructor(private http:HttpClient) { }

  senddata(path:string,data : any){
    console.log("Data Recieved in Service",path,data)
    return this.http.post(`${this.url}/${path}`,data);
  }

  getdata(path:string){
      return this.http.get(`${this.url}/${path}`);
  }
}
