import { Component, OnInit } from '@angular/core';
import { MysettingsService } from 'src/app/services/mysettings.service';

@Component({
  selector: 'app-prelisteleves',
  templateUrl: './prelisteleves.component.html',
  styleUrls: ['./prelisteleves.component.css']
})
export class PrelistelevesComponent implements OnInit {
  dataeleves;
  data;
  arraytab;
  nbrEleves =0;
  index = 0;
  showtable = false;

  constructor(private service: MysettingsService) { }
  ngOnInit() {
      this.data = this.service.ListEleves;
      this.service.filtreActive.niveau = this.service.myClasses[0].niveau ;
     // this.indexTab(0);
      this.showfilterclass(false);
  }
  showfilterclass(e) {
      this.showtable = e == null ? false : true;
      const v = this.filterdata();
      this.arraytab =  ['مصادق عليه(' + v[0] + ')', 'مكرر على مستوى المؤسسة(' + v[1] + ')',
       'في انتظار المصادقة من طرف م. الاقليمية(' + v[2] + ')', 'ملغى من طرف م.الاقليمية(' + v[3] + ')'];
  }
  indexTab(ind) {
      if (ind == 1 || ind == 2 || ind == 3){
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
    let index = JSON.parse(JSON.stringify(this.data));
    index = ac.length < 2  ? index.filter(ii => (ii.cla as string).startsWith(id)) :
         index.filter(ii => (ii.cla === ac));
    const d =  JSON.parse(JSON.stringify(this.service.ListRedondances));
    const index1 = d.filter(r => r.etat == 'مؤسسة' && r.cla.startsWith(id) );
    const index2 = d.filter(r => r.etat == 'مديرية' && r.cla.startsWith(id)  );
    const index3 = d.filter(r => r.etat == 'ملغى' && r.cla.startsWith(id)  );
    switch (this.index) {
      case 1:
        this.dataeleves = index1;
        break;
      case 2:
        this.dataeleves = index2;
        break;
      case 3:
        this.dataeleves = index3;
        break;
      default:
        this.dataeleves = index;
        break;
    }
    return [index.length, index1.length, index2.length, index3.length];
  }

}
