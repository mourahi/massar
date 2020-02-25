import { Component, OnInit, Input } from '@angular/core';
import { MysettingsService } from 'src/app/services/mysettings.service';

@Component({
  selector: 'app-scolariteeleve',
  templateUrl: './scolariteeleve.component.html',
  styleUrls: ['./scolariteeleve.component.css']
})
export class ScolariteeleveComponent implements OnInit {
  @Input() eleve;
  listscolarities;
  constructor(private service: MysettingsService) { }

  ngOnInit(): void {
    this.listscolarities = this.service.ListScolarities.filter(i => i.nmassar == this.eleve.nmassar);
    const myecole = this.service.ecole.gresa + '-' + this.service.ecole.name;
    this.listscolarities.forEach(el => {
      if (el.ecoleorigine == '') { el.ecoleorigine = myecole; }
      if (el.niveau == '') { el.niveau = this.service.getNiveauFormCla(el.cla); }
    });

    this.listscolarities.unshift({
      ascolaire: this.service.filtreActive.ascolaire,
      ecoleorigine: myecole,
      niveau : this.service.getNiveauFormCla(this.eleve.cla),
      cla : this.eleve.cla,
      moy : '',
      resultat : '',
      remarque : ''
    });

  }

}
