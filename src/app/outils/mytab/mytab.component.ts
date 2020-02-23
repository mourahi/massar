import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mytab',
  templateUrl: './mytab.component.html',
  styleUrls: ['./mytab.component.css']
})
export class MytabComponent {
  data;
  indexActived = 0;
  @Input()
    set myarray(d){
      this.data = d;
      this.indexActived = 0;
      this.tabclicked(0, true);
    }
  @Output() indexTab = new EventEmitter();

  constructor() { }

  tabclicked(i, first = false) {
    this.indexActived = i;
    this.indexTab.emit(i);
  }


}
