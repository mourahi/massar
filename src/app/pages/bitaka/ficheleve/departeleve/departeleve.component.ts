import { Component, OnInit, Input } from '@angular/core';
import { MysettingsService } from 'src/app/services/mysettings.service';
import { isDate } from 'util';

@Component({
  selector: 'app-departeleve',
  templateUrl: './departeleve.component.html',
  styleUrls: ['./departeleve.component.css']
})
export class DeparteleveComponent implements OnInit {
  @Input() eleve;
  departs;
  ddepart = '';
  dreception = '';

  constructor(private service: MysettingsService) { }

  ngOnInit(): void {
   this.filterdeparts();
  }
  filterdeparts() {
    this.departs = this.service.ListDeparts.filter(i => i.nmassar == this.eleve.nmassar);
    const myecole = this.service.ecole.gresa + '-' + this.service.ecole.name;
    this.departs.forEach(el => {
      if (el.ecoleorigine == '') { el.ecoleorigine = myecole; }
      if (el.ascolaire == '') { el.ascolaire = this.service.filtreActive.ascolaire; }
    });
  }

  save() {
    let msgerreur = '';
    if (this.ddepart == undefined || this.ddepart == '') {
      msgerreur = ' المرجو ملء تاريخ المغادرة' + '<br>';
    }
    if (this.dreception == undefined || this.dreception == '') {
      msgerreur += ' المرجو ملء تاريخ الالتحاق بالمؤسسة';
    }
    if ( msgerreur != '') {
      this.service.setsuspender({etat: 'no', message : msgerreur});
      return false;
    }
    if (this.dreception > this.ddepart) {
      this.service.setsuspender({etat: 'no', message : 'تاريخ المغادرة يجب ان يكون اكبر من تاريخ الالتحاق بالمؤسسة'});
      return false;
    }


    this.service.ListDeparts.push({
      nmassar: this.eleve.nmassar,
      ascolaire: this.service.filtreActive.ascolaire,
      ecoleorigine: this.service.ecole.gresa + '-' + this.service.ecole.name ,
      ddepart: this.ddepart,
      ecoledestination: '',
      dreception: ''
    });
    this.filterdeparts();
    this.changeSituation('في طور التحويل');
    this.service.setsuspender({etat: 'ok', message: ''});
  }

  changeSituation(v) {
    this.eleve.situation = v;
  }

  cancel() {
    this.service.setsuspender();
    const ld = this.departs.length;
    if (ld > 0) {
      const dv = this.departs[ ld - 1 ];
      const teste = dv.ascolaire == this.service.filtreActive.ascolaire  &&
       (dv.ecoledestination == '' ||
       dv.ecoledestination == this.service.ecole.gresa + '-' + this.service.ecole.name );
      if (teste) {
      this.service.setsuspender({etat: 'ok', message: ''});
      const r = this.service.ListDeparts.filter(i => i.nmassar == this.eleve.nmassar);
      this.service.ListDeparts = this.service.ListDeparts.filter(i => i.nmassar != this.eleve.nmassar);
      r.pop();
      if (r.length > 0) { this.service.ListDeparts = this.service.ListDeparts.concat(r);  }
      this.filterdeparts();
      if (this.departs.length == 0) {
        const l = this.service.ListSorties.filter(i => i.nmassar == this.eleve.nmassar);
        if (l.length > 0) {
          this.changeSituation(l[l.length - 1].situation);
        } else {
          this.changeSituation('يزاول دراسته');
        }

      }
    }
  }
}
}
