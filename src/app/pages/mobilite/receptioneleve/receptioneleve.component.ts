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

  constructor(private service: MysettingsService) { }

  ngOnInit(): void {
    this.myacademies = [...new Set(this.service.ListEtablis.map(i => i.region))];
    this.mylistEtablis = this.service.ListEtablis.filter( j => j.region == this.myacademies[0]);
    this.mydirections = [...new Set( this.mylistEtablis.filter( d => d.region == this.myacademies[0]).map( k => k.direction))];
    this.cycles = ['ابتدائي'];
    this.dataeleves = this.prepareDataeleves();
  }
  prepareDataeleves() {
    const resultat = [];
    [...new Set(this.service.ListAutreEleves.map(i => i.gresa))].forEach(k => {
        const c = this.service.ListAutreEleves
        .filter(j => j.gresa == k );
        if( c.length > 1){
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
    console.log("e=",e);

  }

  settFiltreActive(t) {
    this.service.setsuspender();
    switch (t.id) {
      case 'academies':
        this.mylistEtablis = this.service.ListEtablis.filter( j => j.region == t.value);
        this.mydirections = [...new Set( this.mylistEtablis.filter( d => d.region == t.value).map( k => k.direction))];
        break;
      case 'directions':
        this.mycommunes = [...new Set(this.mylistEtablis.filter( d => d.direction == t.value).map( k => k.commune))];
        break;
      case 'communes':
          this.myecoles = this.mylistEtablis.filter( d => d.commune == t.value).map( k => k.ecole);
    }
  }

  find() {

  }
}
