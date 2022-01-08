import { Component } from '@angular/core';
import { SendService } from './send.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(private sendservice: SendService){}

  name : any
  surname : any
  age : any
  data : any
  receiveddata : any

  getValues(data:any){
      console.log("Form Data Received:",data);
      this.name = data.name
      this.surname = data.surname
      this.age = data.age

      this.data = {name:this.name,surname:this.surname,age:this.age}
      
      console.log("Data Sending to Service")
      this.sendservice.senddata('db',this.data).subscribe(); 
  }

  receiveValues(){
    this.sendservice.getdata('getdata').subscribe((data:any) => {
      this.receiveddata = data;
      console.log("Data Recieved in App:",data)
    });  
  }

}
