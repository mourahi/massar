import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mymodal',
  templateUrl: './mymodal.component.html',
  styleUrls: ['./mymodal.component.css']
})
export class MymodalComponent implements OnInit {
@Input() info ;
   constructor() { }

  ngOnInit() {
    if (this.info == undefined){
      this.info = {etat: '', message: ''}
    }
    console.log("info",this.info);

  }

}
