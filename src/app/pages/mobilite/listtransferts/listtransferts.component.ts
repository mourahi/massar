import { Component, OnInit } from '@angular/core';
import { MysettingsService } from 'src/app/services/mysettings.service';

@Component({
  selector: 'app-listtransferts',
  templateUrl: './listtransferts.component.html',
  styleUrls: ['./listtransferts.component.css']
})
export class ListtransfertsComponent implements OnInit {
  dataeleves;
  data;
  arraytab;
  nbrEleves =0;
  index = 0;
  showtable = false;

  constructor(private service: MysettingsService) { }
  ngOnInit() {
      this.data = this.service.ListDeparts;
      this.service.filtreActive.niveau = this.service.myClasses[0].niveau ;
      this.showfilterclass(false);
  }


  showfilterclass(e) {
      this.showtable = e == null ? false : true;
      const v = this.filterdata();
      this.arraytab =  ['تلاميذ في طور التحويل(' + v[0] + ')', 'المغادرون(' + v[1] + ')',
       'الوافدون(' + v[2] + ')'];
  }

  indexTab(ind) {
      if (ind == 1 || ind == 2 ) {
        this.index = ind;
        this.filterdata();
      } else {
        this.index = 0;
        this.filterdata();
      }
  }
  getDataEleve(nmassar) {
    return this.service.ListEleves.filter(t => t.nmassar == nmassar)
      .map(m => ({arnom: m.arnom, arprenom: m.arprenom, cla: m.cla}))[0];
  }


  filterdata() {
    const f = this.service.filtreActive['typetransfert'];
    this.service.filtreActive['typetransfert'] = f == undefined ? '' : f;

    const id = this.service.getIdFromNameNiveau();
    let index = JSON.parse(JSON.stringify(this.data));
    index = index.filter(ii => {
      if (ii.typetransfert == undefined || ii.typetransfert == '') { ii.typetransfert = 'تحويل فردي' ; }
      if (ii.ecoleorigine == undefined || ii.ecoleorigine == '') { ii.ecoleorigine = this.service.ecole.name ; }
      ii = Object.assign(ii, this.getDataEleve(ii.nmassar));
      return (ii.cla as string).startsWith(id);
    }
    );

    const index0 = index.filter(r => {
      return r.dreception == '' && r.typetransfert.startsWith(this.service.filtreActive['typetransfert']);
    });

    const index1 = index.filter(r => {
      return r.ecoledestination != '' &&
       r.ecoledestination.split('-')[0] != this.service.ecole.gresa &&
       r.typetransfert.startsWith(this.service.filtreActive['typetransfert']);
    });
    const index2 = index.filter(r => r.dreception != '' &&
                r.ecoledestination != '' && r.ecoledestination.split('-')[0] == this.service.ecole.gresa);
    switch (this.index) {
      case 1:
        this.dataeleves = index1;
        break;
      case 2:
        this.dataeleves = index2;
        break;
      default:
        this.dataeleves = index0;
        break;
    }
    return [index0.length, index1.length, index2.length];
  }
}
