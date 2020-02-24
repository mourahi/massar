import { Component, OnInit, Input } from '@angular/core';
import { MysettingsService } from 'src/app/services/mysettings.service';

@Component({
  selector: 'app-scolariteeleve',
  templateUrl: './scolariteeleve.component.html',
  styleUrls: ['./scolariteeleve.component.css']
})
export class ScolariteeleveComponent implements OnInit {
  @Input() nmassar;
  listscolarities;
  constructor(private service: MysettingsService) { }

  ngOnInit(): void {
    const nowscolarite = this.service.ListEleves.filter( j => j.nmassar == this.nmassar)[0];
    this.listscolarities = this.service.ListScolarities.filter(i => i.nmassar == this.nmassar);
    this.listscolarities.unshift({
      ascolaire: this.service.filtreActive.ascolaire,
      ecoleorigine: 'المؤسسة التعليمية',
      niveau : nowscolarite.cla,
      cla : nowscolarite.cla,
      moy : '',
      resultat : '',
      remarque : ''
    });

  }

}
