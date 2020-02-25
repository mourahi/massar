import { Component, OnInit, Input } from '@angular/core';
import { MysettingsService } from 'src/app/services/mysettings.service';

@Component({
  selector: 'app-sortieeleve',
  templateUrl: './sortieeleve.component.html',
  styleUrls: ['./sortieeleve.component.css']
})
export class SortieeleveComponent implements OnInit {
  @Input() eleve;
  sorties;
  tmp;
  etat = 0;
  constructor(private service: MysettingsService) { }

  ngOnInit(): void {
   this.filtersorties();
  }
  filtersorties() {
    this.sorties = this.service.ListSorties.filter(i => i.nmassar == this.eleve.nmassar);
    const myecole = this.service.ecole.gresa + '-' + this.service.ecole.name;
    this.sorties.forEach(el => {
      if (el.ecoleorigine == '') { el.ecoleorigine = myecole; }
      if (el.niveau == '') { el.niveau = this.service.getNiveauFormCla(el.cla); }
    });
  }

  save() { // op==1 ==> اعادة الادماج  sinon = انقطاع
    this.service.setsuspender();
    this.service.ListSorties= this.service.ListSorties.filter(i => i.nmassar != this.eleve.nmassar);
    if ( this.tmp != undefined &&  this.tmp.length > 0) {
      this.service.ListSorties = [...this.service.ListSorties  , ...this.tmp];
      this.changeSituation(this.etat == 2 ? 'منقطع' : 'يزاول دراسته');
     } else if (this.etat == 0) {
      const d = this.service.ListDeparts.filter(i => i.nmassar == this.eleve.nmassar).length > 0;
      this.changeSituation( d ? 'في طور التحويل' : 'يزاول دراسته');
     }


  }
  plus(op, dop) {
    this.etat = op;
    const opera = op == 2 ? 'إنقطاع' : 'اعادة الادماج';
    this.tmp = JSON.parse(JSON.stringify(this.sorties));
    this.tmp.push({
      nmassar: this.eleve.nmassar,
      ascolaire: this.service.filtreActive.ascolaire,
      ecoleorigine: this.service.ecole.gresa + '-' + this.service.ecole.name,
      niveau : this.service.getNiveauFormCla(this.eleve.cla),
      cla: this.eleve.cla,
      operation: opera,
      doperation: dop
    });
    this.sorties = this.tmp;

  }
  cancel() {  // a completer par le sauvegarde
    this.service.setsuspender();
    if (this.sorties.length > 0) {
      this.tmp = JSON.parse(JSON.stringify(this.sorties));
      this.tmp.pop();
      this.sorties = this.tmp;
      const l = this.tmp.length;
      if (l > 0) {
        this.etat = this.tmp[l - 1].operation == 'إنقطاع' ? 2 : 1;
      } else {
        this.etat = 0; // laisser sauvegarde refechir
      }
    }
  }

  changeSituation(v) {
    this.eleve.situation = v;
  }

}
