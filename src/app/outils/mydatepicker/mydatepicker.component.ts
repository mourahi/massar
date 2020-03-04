import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mydatepicker',
  templateUrl: './mydatepicker.component.html',
  styleUrls: ['./mydatepicker.component.css']
})
export class MydatepickerComponent implements OnInit {
  @Input() set data(data) {
    const r = data.indexOf('-') > -1 ? data.split('-') : data.split('/');
    console.log("data, +r[2], +r[1], +r[0] ",data,r[2], r[1], r[0]);

    this.element = data == '' ? new Date() : new Date(+r[2], +r[1], +r[0]);
    this.selecteday = this.element.getDate() + '/'+ (+this.element.getMonth() + 1) + '/' + this.element.getFullYear();



  }
  @Output() dateChange = new EventEmitter();

  dataview = [];
  element: Date;
  month: string[];
  maxBymonth: number[];
  findit = false;
  indexfirstday;
  maxnowday;
  maxlastday;
  finmaxnew = false;
  themonth;
  selecteday;
  showit;

  constructor() { }
  ngOnInit(): void {
    this.showit = false;
    this.month = ['يناير', 'فبراير', 'مارس', 'ابريل', 'ماي', 'يونيو', 'يوليوز', 'غشت', 'شتنبر', 'اكتوبر', 'نونبر', 'دجنبر'];
    this.element = this.element == undefined ? new Date() : this.element ;
    this.boucle();
  }
  boucle() {

    this.finmaxnew = false;
    this.findit = false;
    this.themonth = this.month[this.element.getMonth()] + ' ' + this.element.getFullYear();
    this.indexfirstday = new Date(this.element.getFullYear(), this.element.getMonth() , 1).getDay();
    this.maxnowday = new Date(this.element.getFullYear(), this.element.getMonth() + 1, 0).getDate();
    this.maxlastday = new Date(this.element.getFullYear(),
     (this.element.getMonth() == 0 ? 0 : this.element.getMonth()), 0).getDate();
    this.dataview = [];
    for (let r = 0; r < 7; r++) { // remplir chaque row du tableau
      this.dataview.push( this.getArrayNbr(r));
    }
  }
  mydate() {
     this.selecteday = this.element.getDate() + '/'+ (+this.element.getMonth() + 1) + '/' + this.element.getFullYear();
     this.dateChange.emit(this.selecteday);
    }
  nextmois(p){
      this.element =  new Date(this.element.getFullYear(), p ? this.element.getMonth()-1 :
                      this.element.getMonth() + 1 , 1);
      this.boucle();
  }

  changedate(v){
    this.showit = false;
    this.element = new Date(this.element.getFullYear(), v.mois, v.j);
    this.themonth =this.month[v.mois] + ' ' + this.element.getFullYear();
    this.boucle();
    this.mydate();
  }


 todate(e) {
  const rect = e.getBoundingClientRect();
  console.log(rect.top, rect.right, rect.bottom, rect.left);

  const validkey = ['0','1','2','3','4','5','6','7','8','9', '/'];
  if (validkey.indexOf(e.key) > -1) {
  const r = (e.target.value as string).split('/').filter( i => i != '');
  if ( r.length == 3 && r[2].length > 0) {
    this.element = new Date(+r[2], +r[1]-1, +r[0]);
    this.boucle();
  }
} else {
  this.selecteday = e.target.value.split(e.key).join('');
  this.boucle();
}
  if (e.target.value == ''){
    this.element = new Date();
    this.boucle();
  }

 }

  getArrayNbr(i) {
    let re = [];
    if (i == 0) {
      const sit = this.indexfirstday == 0 ? 7 : this.indexfirstday;
      for (let index = 0 ; index <  sit; index++) {
          re.push({j: this.maxlastday - index,
                   new : false, mois: this.element.getMonth() - 1 });
      }
      re.reverse();
      if (this.indexfirstday > 0) {
        for (let f = 1; f < 7 - this.indexfirstday +1 ; f++) {
          this.findit = this.findit == false ? this.findit = f == this.element.getDate() : false;
          re.push({j: f , new : true, now: (this.findit ? true : false) , mois: this.element.getMonth() });
        }
      }

    } else {
      const saa = this.dataview[this.dataview.length - 1];
      const m = (this.indexfirstday == 0 && i == 1) ? 0 :  saa[saa.length - 1].j ;
      let con = 0;
      for (let k = m ; k < m + 7; k++) {
        const el = k ;
        if (el < this.maxnowday) {
          let aa;
          if (k + 1 == this.element.getDate() && this.findit == false) {
             aa =  {j: k + 1 , new : false , now: true, mois : this.element.getMonth() };
             this.findit = true;
           } else {
             aa = {j: k + 1 ,
              new : this.finmaxnew ? false :  true, now: false,
              mois : this.finmaxnew ? this.element.getMonth() + 1 :  this.element.getMonth()
            } ;
           }

          re.push(aa);
        } else {
          this.finmaxnew = true;
          con += 1;
          re.push({j: con , new : false, now: false ,  mois: this.element.getMonth() + 1});
        }
       }
    }

    return re;
  }

}
