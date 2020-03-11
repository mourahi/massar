import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-receptioneleve',
  templateUrl: './receptioneleve.component.html',
  styleUrls: ['./receptioneleve.component.css']
})
export class ReceptioneleveComponent implements OnInit {
  academies ;
  academieactive;
  communes;
  ecoles;
  cycles;
  constructor() { }

  ngOnInit(): void {
    this.communes = ['جماعة1','جماعة2','جماعة3','جماعة4'];
    this.ecoles = ['مؤسسة تعليمية A','مؤسسة تعليمية B','مؤسسة تعليمية C','مؤسسة تعليمية D'];
    this.cycles = ['الابتدائي'];
    this.academies = [
    {
      name : 'مراكش-اسفي',
      directions: ['مراكش', 'اسفي','اليوسفية','الصويرة','الحوز','قلعة السراغنة','شيشاوة','الرحامنة']
    },
    {
      name : 'طنجة-تطوان-الحسيمة',
      directions: ['الحسيمة', 'شفشاون','فحص-انحرة','العرائش','وزان','طنجة-اصيلا','تطوان','المضيق-الفنيدق']
    },
  ];
    this.academieactive = this.academies[0];

  }
  settFiltreActive(t){
    console.log("t=", t);
    switch (t.id) {
      case 'academies':
        this.academieactive = this.academies.filter(i => i.name == t.value)[0];
        break;
      case 'directions':

        break;
      default:
        break;
    }
    console.log('this.academieactive = ',this.academieactive);

  }
  find() {

  }
}
