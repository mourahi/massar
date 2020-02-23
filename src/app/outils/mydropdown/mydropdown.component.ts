import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mydropdown',
  templateUrl: './mydropdown.component.html',
  styleUrls: ['./mydropdown.component.css']
})
export class MydropdownComponent implements OnInit {
  @Input() mylistdata;
  @Input() format = ''; //no vide : le header ne va pas changer
  header;
  showit  = false;
  constructor() { }

  ngOnInit() {
    this.header =  this.mylistdata[0];
  }
  changement(item){
    this.header = item;
  }

}
