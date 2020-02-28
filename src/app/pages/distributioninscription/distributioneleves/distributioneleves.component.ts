import { Component, OnInit, ViewChild } from '@angular/core';
import { MysettingsService } from 'src/app/services/mysettings.service';
import { SmarttableComponent } from 'src/app/outils/smarttable/smarttable.component';
import { MytabComponent } from 'src/app/outils/mytab/mytab.component';

@Component({
  selector: 'app-distributioneleves',
  templateUrl: './distributioneleves.component.html',
  styleUrls: ['./distributioneleves.component.css']
})
export class DistributionelevesComponent implements OnInit {
  @ViewChild(SmarttableComponent) smarttab;
  @ViewChild(MytabComponent) mytab;
  dataeleves;
  arraytab;
  data;
  listnumerosclasses; // afficher la liste des classes (redisribution manuelle)
  itemsSmartTableCheck;
  constructor(private service: MysettingsService) {
  }

  ngOnInit() {
    this.itemsSmartTableCheck = this.service.itemsSmartTableCheck;
    this.data = this.service.ListEleves.slice();
    this.indexTab(0);
    this.service.filtreActive.niveau = this.service.myClasses[0].niveau;
    //this.service.filtreActive.classe = '*';
    this.showfilterclass();
  }

  showfilterclass() {
    this.listnumerosclasses = this.service.listNumClasses.slice()
    .filter(i => i.niveau === this.service.filtreActive.niveau);
    this.arraytab = this.listnumerosclasses.map(i => i.numero);
    this.arraytab.unshift('التلاميذ الغير موزعين');
  }

  indexTab(ind) {
    // a completer par changement de 1APG
    this.service.filtreActive.classe = ind === 0 ? this.service.getIdFromNameNiveau() : this.arraytab[ind];
    this.dataeleves = this.data.filter(ii => {
          return ii.cla === this.service.filtreActive.classe;
      });

  }
  btnReDistribuTo(v) {
    let arrayItemChecked = this.smarttab.mydata.filter(i => i.addcheck == true);
    arrayItemChecked.forEach(x => {x.addcheck = false; });
    arrayItemChecked = arrayItemChecked.map(j => j.n).slice();

    this.service.setsuspender();
    this.service.ListEleves.forEach(element => {
      if (arrayItemChecked.indexOf(element.n) > -1 ) {
        element.cla = v;
      }
    });
    this.smarttab.checkall(false);
    this.mytab.indexActived = 0;
    this.indexTab(0);
  }
  annulerDistribution() {
    if (this.service.filtreActive.classe.indexOf('-') > 0) {
      this.btnReDistribuTo(this.service.getIdFromNameNiveau());
    }

  }

}
