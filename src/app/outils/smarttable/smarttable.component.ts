import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-smarttable',
  templateUrl: './smarttable.component.html',
  styleUrls: ['./smarttable.component.css']
})
export class SmarttableComponent implements OnInit {
  mydata;
  @Input() maxview;
  @Input() newKeysnames;
  @Input() activeColorTr = false;
  @Input()
     set data(data) {
          if (data !== undefined) {
          this.mydata = data.slice();
          this.ngOnInit();
         }
     }
 @Output() trSelected = new EventEmitter<any>();
   datakeys;
   clickedkey;
   numpage;
   totalitem;
   dataviewed;
   maxviewed;
   numerospagesarray;
   keystoshow;
   debut;
   fin;
   iTrSelected;
   constructor() { }
   trclicked(i){
      this.iTrSelected = this.activeColorTr ? i : -1;
      this.trSelected.emit(this.dataviewed[i]);
   }

   ngOnInit() {
      // this.mydata = [{name: 'adil', age: 40}, {name: 'saida', age: 30}];
      // this.newKeysnames = {name: 'اسم'};
      // this.etatKeys = {name: 'link'}; // {key:addconcat|input|check|hide, addcheck: 'addcheck'}

      if (this.mydata != undefined) {
        this.maxview = (this.maxview === undefined) ? 5 : this.maxview;
        this.maxviewed = this.maxview;
        this.newKeysnames = this.newKeysnames === undefined ? {} : this.newKeysnames;
        this.totalitem = this.mydata.length;
        if (this.totalitem > 0) {
            this.datakeys = Object.keys(this.newKeysnames).length === 0 ?
               this.prepareDatakeys(Object.keys(this.mydata[0])) : this.newKeysnames;
        }
        if (this.datakeys != undefined){
          this.keystoshow =  Object.keys(this.datakeys);
          this.clickedkey = new Array(this.datakeys.length);
          this.maxviewed = (this.maxviewed > this.totalitem) ? this.totalitem : this.maxviewed;
          this.numerospagesarray = (this.totalitem === 0) ?
                  [0] : Array.from({length: Math.ceil(this.totalitem / this.maxview)},
                  (v, k) => k + 1);
          this.filterdata(1);
        }

      }
   }
   prepareDatakeys(d) {
     const r = {};
     d.forEach(i => {
       r[i] = i ;
     });
     return r;
   }

   sort(key, index) {
     key = key == 'addconcat' ? this.newKeysnames.addconcat.concat[0] : key;
     if (this.clickedkey[index] !== 'asc' ) {
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
// ici mydata doit etre filter avec les critères du service
   filterdata(npage) {
     const m = this.numerospagesarray.length;
     if (npage > m) {
       npage = m;
     } else if (npage < 1) {
       npage = 1;
     }
     this.numpage = npage;
     this.debut = (npage - 1) * this.maxviewed ;
     this.fin = this.debut + this.maxviewed ;
     this.dataviewed = this.mydata.slice(this.debut, this.fin );
   }
// gestion des evenements
checkall(v) {
  this.mydata.forEach(a => {
    a.addcheck = v;
  });
  this.setValueToCheckAll(v);
 }

setValueToCheckAll(v){
  const elem = document.getElementById('chAll') as HTMLInputElement;
  elem.checked = v;
}


 checkone(v) {
   if (!v) {
    this.setValueToCheckAll(false);
  } else {
    const x = this.mydata.filter(i => i.addcheck === true).length;
    this.setValueToCheckAll(x === this.mydata.length ? true : false);
  }

 }
 inputchange(e, item, k) {
   console.log("e,item,k",e,item,k);

   this.mydata.forEach(x => { if (Object.is(x, item)) { x[k] = e.target == undefined ? e : e.target.value; }});
}

}
