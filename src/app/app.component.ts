import { Component, OnInit, OnDestroy } from '@angular/core';
import { MysettingsService } from './services/mysettings.service';
import { MydataService } from './services/mydata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

hidemenu = false;
listannees = [{d: '2019/2020', path: ''}, {d: '2018/2019', path: ''}];
listlang = [{d: 'العربية', path: ''}, {d: 'français', path: ''}];
title;
chargementOk = false;
ecole;


constructor( private service: MydataService, private settings: MysettingsService) {}
ngOnInit(): void {
  this.ecole = this.settings.ecole.name;
  this.getListEleves();
}
getListEleves() {
  const structure = this.service.getMyStructure();
  structure.subscribe(re => {
    console.log('Mystructure chargé depuis internet re= ', re);
    this.settings.myClasses = re;
    this.settings.getlistNumClasses();
    this.settings.filtreActive.niveau = re[0].niveau;
    this.settings.filtreActive.ascolaire = re[0].ascolaire;
    const eleves = this.service.getMyData();
    eleves.subscribe(rre => {
      console.log('Listeleves chargé depuis internet re= ', rre);
      this.settings.ListAutreEleves = rre.filter( i => i.gresa != ''); // etudiants vide
      this.settings.ListEleves = rre.filter( i => i.gresa == '');
      this.chargementOk = true;

      const etablis = this.service.getEtablis();
      etablis.subscribe( ree => {
        console.log('ListEtablis chargé depuis internet re= ', ree);
        this.settings.ListEtablis = ree;
      });
      const departs = this.service.getMyDeparts();
      departs.subscribe( r => {
        console.log('ListDeparts chargé depuis internet re= ', r);
        this.settings.ListDeparts = r;
      });
      const sorties = this.service.getMySortie();
      sorties.subscribe( s => {
        console.log('ListSortie chargé depuis internet re= ', s);
        this.settings.ListSorties = s;
      });
      const scolarities = this.service.getMyScolarite();
      scolarities.subscribe( as => {
        this.settings.ListScolarities = as;
        console.log('scolarities chargé depuis internet re= ', as);
      });
      const redondances = this.service.getMyRedondance();
      redondances.subscribe( fs => {
        this.settings.ListRedondances = fs;
        console.log('Redondance chargé depuis internet re= ', fs);
      });
    });
  });

}

}
