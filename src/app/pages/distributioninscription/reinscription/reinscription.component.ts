import { Component, OnInit, ViewChild } from '@angular/core';
import { MysettingsService } from 'src/app/services/mysettings.service';
import { SmarttableComponent } from 'src/app/outils/smarttable/smarttable.component';
import { MytabComponent } from 'src/app/outils/mytab/mytab.component';

@Component({
  selector: 'app-reinscription',
  templateUrl: './reinscription.component.html',
  styleUrls: ['./reinscription.component.css']
})
export class ReinscriptionComponent implements OnInit {
  @ViewChild(SmarttableComponent) smarttab;
  @ViewChild(MytabComponent) mytab;
  dataeleves;
  data;
  arraytab;
  nbrEleves = 0;
  index = 0;
  showtable = false;
  itemsSmartTableCheck;
  constructor(private service: MysettingsService) { }
  ngOnInit() {
      this.itemsSmartTableCheck = this.service.itemsSmartTableCheck;
      this.data = this.service.ListEleves;
      this.service.filtreActive.niveau = this.service.myClasses[0].niveau ;
     // this.indexTab(0);
      this.showfilterclass(false);
  }
  showfilterclass(e = null) {
      this.showtable = e == null ? false : true;
      const v = this.filterdata();
      this.arraytab =  ['غير ملتحق(' + v[0] + ')', 'تسجيلات مصادق عليها(' + v[1] + ')'];
  }
  indexTab(ind) {
      if (ind == 1) {
        this.index = ind;
      } else {
        this.index = 0;
      }
      this.filterdata();
  }
  filterdata() {
    const id = this.service.getIdFromNameNiveau();
    const ac = this.service.filtreActive.classe;
    let d = JSON.parse(JSON.stringify(this.data));
    d = ac.length < 2  ? d.filter(ii => (ii.cla as string).startsWith(id)) :
         d.filter(ii => (ii.cla === ac));
    const index1 = d.filter(ii => ii.situation !== 'غير ملتحق' );
    const index = d.filter(ii => ii.situation === 'غير ملتحق');

    switch (this.index) {
      case 1:
        this.dataeleves = index1;
        break;
      default:
        this.dataeleves = index;
        break;
    }
    return [index.length, index1.length];
  }

  annulerInscription() {
    this.addSituation('غير ملتحق');
    this.showfilterclass();
  }
  inscription() { // a complter car il faut voir si منقطع ou ...
    this.addSituation('يزاول دراسته');
    this.showfilterclass();
  }
  addSituation(v) {
    let arrayItemChecked = this.smarttab.mydata.filter(i => i.addcheck == true);
    arrayItemChecked.forEach(x => {x.addcheck = false; });
    arrayItemChecked = arrayItemChecked.map(j => j.n).slice();

    this.service.setsuspender();
    this.service.ListEleves.forEach(element => {
      if (arrayItemChecked.indexOf(element.n) > -1 ) {
        element.situation = v;
      }
    });
    this.smarttab.checkall(false);
    this.mytab.indexActived = 0;
    this.indexTab(0);
  }

}
