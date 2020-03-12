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

  constructor(private service: MysettingsService) { }

  ngOnInit(): void {
    this.myacademies = [...new Set(this.service.ListEtablis.map(i => i.region))];
    this.mylistEtablis = this.service.ListEtablis.filter( j => j.region == this.myacademies[0]);
    this.mydirections = [...new Set( this.mylistEtablis.filter( d => d.region == this.myacademies[0]).map( k => k.direction))];
    this.cycles = ['ابتدائي'];
    this.filtreactive.region = this.myacademies[0];
    this.dataview = [];
    this.dataeleves = this.prepareDataeleves();
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
