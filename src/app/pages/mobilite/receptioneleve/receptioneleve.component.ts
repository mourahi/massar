import { Component, OnInit } from '@angular/core';
import { MysettingsService } from 'src/app/services/mysettings.service';

@Component({
  selector: 'app-receptioneleve',
  templateUrl: './receptioneleve.component.html',
  styleUrls: ['./receptioneleve.component.css']
})
export class ReceptioneleveComponent implements OnInit {
  cycles;
  mylistEtablis;
  myacademies;
  mydirections;
  mycommunes;
  myecoles;
  arraytab = ['لائحة المؤسسات', 'استقبال التلاميذ'];
  dataeleves;
  dataview;
  filtreactive = {region: '', direction: '', commune: '', ecole: ''};
  hidepage1 = false;
  types: string[];
  listniveaux: any;
  datalistElevesActive;
  ecole;
  gresa;
  listnumerosclasses: { niveau: string; numero: string; }[];
  constructor(private service: MysettingsService) { }

  ngOnInit(): void {
    this.hidepage1 = false;
    this.types = this.service.types;
    this.listniveaux = this.service.myClasses.slice();
    this.myacademies = [...new Set(this.service.ListEtablis.map(i => i.region))];
    this.mylistEtablis = this.service.ListEtablis.filter( j => j.region == this.myacademies[0]);
    this.mydirections = [...new Set( this.mylistEtablis.filter( d => d.region == this.myacademies[0]).map( k => k.direction))];
    this.filtreactive.region = this.myacademies[0];
    this.cycles = ['ابتدائي'];
    this.filtreactive.region = this.myacademies[0];
    this.dataview = [];
    this.dataeleves = this.prepareDataeleves();
  }

  addlinkclicked(e){
    this.hidepage1 = true;
    this.ecole = e.ecole;
    this.gresa = e.gresa;
  }

  preparationlistReception(niveau) {
    this.datalistElevesActive = this.service.ListAutreEleves.filter(j =>{
      return j.gresa == this.gresa && this.service.getNiveauFormCla(j.cla) == niveau;
    });
    this.datalistElevesActive.forEach(el => {
        el.niveau = this.service.getNiveauFormCla(el.cla);
    });
    this.listnumerosclasses = this.service.listNumClasses.filter(i => i.niveau == niveau).slice();
  }

  findclasse(v){
    this.preparationlistReception(v);
  }

  reception(v, dr) {
    const elevesreceptioned = this.datalistElevesActive.filter( i => i.addcheck == true).map(j => j.nmassar);
    this.datalistElevesActive= this.datalistElevesActive.filter( i => i.addcheck != true);
    const neweleves = this.service.ListAutreEleves.filter(el => {
      if (elevesreceptioned.indexOf(el.nmassar) > -1) {
        this.service.ListDeparts.push({nmassar: el.nmassar,
          ascolaire: '2019/2020',
          ecoleorigine : this.gresa + '-' + this.ecole,
          ddepart : el.dtransfert,
          ecoledestination: this.service.ecole.gresa + '-' + this.service.ecole.name,
          dreception: dr
          });
        el.gresa = '';
        el.dtransfert = '';
        el.typetransfert = '';
        el.addcheck = false;
        el.cla = v == '*' ? el.cla.split('-')[0] : v;
        this.service.ListEleves.push(el);
        return true;
      }
    });
    this.service.ListAutreEleves = this.service.ListAutreEleves.filter( ff => ff.gresa != '' );
    // update table Depart

  }

  prepareDataeleves() {
    const resultat = [];
    [...new Set(this.service.ListAutreEleves.map(i => i.gresa))].forEach(k => {
        const c = this.service.ListAutreEleves
        .filter(j => j.gresa == k );
        if ( c.length > 1){
          let da;
          c.forEach(a => {
            if (da == undefined) {
              da = a.dtransfert.replace(/\//g, '-');
            } else {
              const aaa = a.dtransfert.replace(/\//g, '-');
              da = (new Date(aaa)).getTime() > (new Date(da)).getTime() ? aaa : da;
            }
          });
          resultat.push(Object.assign({gresa: k , nbrpartants: c.length, dtransfert: da}, this.getEtablisByGresa(k)));
        } else {
          resultat.push(Object.assign({gresa: k , nbrpartants: c.length,
             dtransfert: c[0].dtransfert.replace(/\//g, '-') }, this.getEtablisByGresa(k)));
        }
    });
    return resultat;
  }

  getEtablisByGresa(g) {
    return this.service.ListEtablis.filter(i => i.gresa == g)[0];
  }

  indexTab(e){
    console.log("e=", e);
  }

  settFiltreActive(t) {
    this.service.setsuspender();
    switch (t.id) {
      case 'academies':
        this.mylistEtablis = this.service.ListEtablis.filter( j => j.region == t.value);
        this.mydirections = [...new Set( this.mylistEtablis.filter( d => d.region == t.value).map( k => k.direction))];
        this.filtreactive.region = t.value;
        break;
      case 'directions':
        this.mycommunes = [...new Set(this.mylistEtablis.filter( d => d.direction == t.value).map( k => k.commune))];
        this.filtreactive.direction = t.value;
        break;
      case 'communes':
          this.myecoles = this.mylistEtablis.filter( d => d.commune == t.value).map( k => k.ecole);
          this.filtreactive.commune = t.value;
          break;
      case 'ecoles' :
          this.filtreactive.ecole = t.value;
    }
  }

  find(nmassar) {
    this.service.setsuspender();
    const f = [];
    if (nmassar != '') {
          this.dataview = this.dataeleves.filter( i => i.nmassar == nmassar);
          return false;
        }

    this.dataview = this.dataeleves.filter( i => {
        const ad = [];
        if (this.filtreactive.ecole != ''){
          ad.push(i.ecole.replace(/ /g, '')  == this.filtreactive.ecole.replace(/ /g, '')) ;
        }
        if ( this.filtreactive.direction != '') {
        ad.push(i.direction.replace(/ /g, '')  == this.filtreactive.direction.replace(/ /g, '') ) ;
      }
        if (this.filtreactive.commune != '') {
        ad.push(i.commune.replace(/ /g, '')  == this.filtreactive.commune.replace(/ /g, '') ) ;
      }
        if (this.filtreactive.region != ''){
          ad.push( i.region.replace(/ /g, '')  == this.filtreactive.region.replace(/ /g, '') ) ;
        }
        return ad.indexOf(false) == -1;
      });
    }
}
