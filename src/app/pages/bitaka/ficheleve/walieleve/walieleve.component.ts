import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-walieleve',
  templateUrl: './walieleve.component.html',
  styleUrls: ['./walieleve.component.css']
})
export class WalieleveComponent implements OnInit {
  typetutelle;
  selectedtutelle;
  constructor() { }

  ngOnInit(): void {
    this.typetutelle = ['أب','أم','وصي'];
    this.selectedtutelle = this.typetutelle[0];
  }
  changeTutelle(e){
    console.log("e=",e);

  }

}
