import { Component, OnInit, Input } from '@angular/core';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-mytable',
  templateUrl: './mytable.component.html',
  styleUrls: ['./mytable.component.css']
})
export class MytableComponent implements OnInit {
  mydata;
 @Input()
    set data(data){
        this.mydata = data;
        this.ngOnInit();
    }

  datakeys;
  clickedkey;
  numpage;
  totalitem;
  dataviewed;
  maxviewed;
  numerospagesarray;

  constructor() { }
  ngOnInit() {
      this.maxviewed = 20;
      this.numpage = 1;
      this.totalitem = 0;
      this.datakeys = Object.keys(this.mydata[0]);
      this.clickedkey = new Array(this.datakeys.lenght);
      this.totalitem = this.mydata.length;
      this.maxviewed = this.maxviewed > this.totalitem ? this.totalitem : this.maxviewed;
      this.pager();
      this.filterdata(this.numpage);
  }
  pager() {
    this.numerospagesarray = Array.from({length: Math.round(this.totalitem / this.maxviewed)}, (v, k) => k + 1);
  }

  sort(key, index) {
    if (this.clickedkey[index] != 'asc' ) {
      this.clickedkey = new Array(this.datakeys.lenght);
      this.clickedkey[index] = 'asc';
    } else {
      this.clickedkey = new Array(this.datakeys.lenght);
      this.clickedkey[index] = 'desc';
    }
    this.mydata.sort(this.compareValues(key, this.clickedkey[index]));
    this.filterdata(1);
  }
   compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  filterdata(npage){
    const m = this.numerospagesarray.length;
    if (npage > m) {
      npage = m;
    } else if (npage < 1) {
      npage = 1;
    }
    this.numpage = npage;
    const debut = (npage - 1) * this.maxviewed ;
    const fin = debut + this.maxviewed ;
    this.dataviewed = this.mydata.slice(debut, fin );

  }

}
