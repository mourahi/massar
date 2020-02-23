import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mymodal',
  templateUrl: './mymodal.component.html',
  styleUrls: ['./mymodal.component.css']
})
export class MymodalComponent implements OnInit {
@Input() message;
   constructor() { }

  ngOnInit() {
  }

}
