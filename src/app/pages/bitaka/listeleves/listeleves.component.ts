import { Component, OnInit } from '@angular/core';
import { MysettingsService } from 'src/app/services/mysettings.service';

@Component({
  selector: 'app-listeleves',
  templateUrl: './listeleves.component.html',
  styleUrls: ['./listeleves.component.css']
})
export class ListelevesComponent implements OnInit {
  dataeleves;
  data;
  arraytab;
  nbrEleves =0;
  index = 0;
  showtable = false;
  itemsSmartTableLink;

  constructor(private service: MysettingsService) { }
  ngOnInit() {
      this.itemsSmartTableLink = this.service.itemsSmartTableLink;
      this.data = this.service.ListEleves;
      this.service.filtreActive.niveau = this.service.myClasses[0].niveau ;
     // this.indexTab(0);
      this.showfilterclass(false);
  }
  showfilterclass(e) {
      this.showtable = e == null ? false : true;
      const v = this.filterdata();
      this.arraytab =  ['يزاول دراسته(' + v[0] + ')', 'في طور التحويل(' + v[1] + ')', 'منقطع(' + v[2] + ')'];
  }
  indexTab(ind) {
      if (ind == 1 || ind == 2){
        this.index = ind;
        this.filterdata();
      } else {
        this.index = 0;
        this.filterdata();
      }
  }
  filterdata() {
    const id = this.service.getIdFromNameNiveau();
    const ac = this.service.filtreActive.classe;
    let d = JSON.parse(JSON.stringify(this.data));
    d = ac.length < 2  ? d.filter(ii => (ii.cla as string).startsWith(id)) :
         d.filter(ii => (ii.cla === ac));
    const index1 = d.filter(ii => ii.situation === 'في طور التحويل' );
    const index2 = d.filter(ii => ii.situation === 'منقطع');
    const index = d.filter(ii => ii.situation === 'يزاول دراسته');

    switch (this.index) {
      case 1:
        this.dataeleves = index1;
        break;
      case 2:
        this.dataeleves = index2;
        break;
      default:
        this.dataeleves = index;
        break;
    }
    return [index.length, index1.length, index2.length];
  }


}
