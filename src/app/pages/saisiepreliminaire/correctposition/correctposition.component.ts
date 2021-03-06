import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MysettingsService } from 'src/app/services/mysettings.service';

@Component({
  selector: 'app-correctposition',
  templateUrl: './correctposition.component.html',
  styleUrls: ['./correctposition.component.css']
})
export class CorrectpositionComponent implements OnInit {
  n = '';
  dataeleves;
  eleve;
  titles;
  constructor(private activedroute: ActivatedRoute, private service: MysettingsService) { }

  ngOnInit(): void {
    this.titles = {
      nmassar: 'رقم التلميذ',
      nom: 'النسب بالفرنسية',
      prenom : 'الاسم بالفرنسية',
      arnom : 'النسب بالعربية',
      arprenom: 'الاسم بالعربية',
      genre: 'النوع',
      dnaissance: 'تاريخ الازدياد',
      etat: 'الوضعية',
      ecoleorigine: 'المؤسسة',
      niveau : 'المستوى',
      cla : 'القسم'
      };
    this.eleve = {};
    Object.keys(this.titles).forEach(e => {
        this.eleve[e] = '';
      });

    this.activedroute.params.subscribe(nm => {
      this.dataeleves =  this.service.ListRedondances.filter(i => i.n == nm.n);
      this.dataeleves = this.dataeleves.concat(this.getSimulaireEleve());
      this.dataeleves.forEach(el => {
        el.ecoleorigine = this.service.ecole.name;
        el.niveau = this.service.getNiveauFormCla(el.cla);
        el.etat = el.etat == undefined || el.etat == '' ? 'مصادق عليه' : 'مكرر على مستوى المؤسسة';
      });

    });
  }
  getSimulaireEleve() {
    const x = this.dataeleves[0];
    return this.service.ListEleves.filter(
      f => f.dnaissance == x.dnaissance && f.arnom == x.arnom
      );
  }
  trSelected(o){
    this.eleve = o;
  }

}
