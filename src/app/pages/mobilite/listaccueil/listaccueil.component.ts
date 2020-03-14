import { Component, OnInit } from '@angular/core';
import { MysettingsService } from 'src/app/services/mysettings.service';

@Component({
  selector: 'app-listaccueil',
  templateUrl: './listaccueil.component.html',
  styleUrls: ['./listaccueil.component.css']
})
export class ListaccueilComponent implements OnInit {
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
      this.dataeleves = this.filterdata();
  }

  getDataEleve(nmassar) {
    return this.service.ListEleves.filter(t => t.nmassar == nmassar)
      .map(m => ({arnom: m.arnom, arprenom: m.arprenom,
         cla: m.cla, genre: m.genre, dnaissance: m.dnaissance,
         myniveau: this.service.getNiveauFormCla(m.cla)}))[0];
  }


  filterdata() {
    let f = this.service.filtreActive['gresaaccueil'];
    f = f == undefined ? '' : f;
    this.service.filtreActive['gresaaccueil'] = f;

    const id = this.service.getIdFromNameNiveau();
    const index = JSON.parse(JSON.stringify(this.data));
    return index.filter(ii => {
      if (ii.typetransfert == undefined || ii.typetransfert == '') { ii.typetransfert = 'تحويل فردي' ; }
      if (ii.ecoleorigine == undefined || ii.ecoleorigine == '') { ii.ecoleorigine = this.service.ecole.name ; }
      ii = Object.assign(ii, this.getDataEleve(ii.nmassar));
      return (ii.cla as string).startsWith(id) &&
         ii.ecoleorigine.split('-')[0].startsWith(f) && ii.dreception != '';
    }
    );
  }
}
