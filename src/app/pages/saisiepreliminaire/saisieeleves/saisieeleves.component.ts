import { Component, OnInit } from '@angular/core';
import { MysettingsService } from 'src/app/services/mysettings.service';

@Component({
  selector: 'app-saisieeleves',
  templateUrl: './saisieeleves.component.html',
  styleUrls: ['./saisieeleves.component.css']
})
export class SaisieelevesComponent implements OnInit {
  dataeleves;
  constructor(private service: MysettingsService) { }

  ngOnInit(): void {
    this.service.filtreActive.niveau = this.service.myClasses[0].niveau;
    this.service.filtreActive.classe = this.service.getlistNumClasses()[0].numero;
    this.showfilterclass();
  }
  save() {
    console.log('dataeleve:', this.dataeleves);

  }

  showfilterclass() {
    if (this.service.filtreActive.classe == '*') {
      this.service.filtreActive.classe = this.service.getlistNumClasses()
         .filter(c => c.niveau = this.service.filtreActive.niveau)[0].numero;
   }

    const d = this.service.ListEleves.filter(i => i.cla == this.service.filtreActive.classe);
    this.dataeleves = JSON.parse(JSON.stringify(d));
    if (this.service.filtreActive.classe.startsWith('1APG')) {
      this.dataeleves.push(this.getNewLine());
    }

  }
  getNewLine() {
    const titles =  [
      'n',
      'cla',
      'nmassar',
      'nom',
      'prenom',
      'arnom',
      'arprenom',
      'genre',
      'dnaissance',
      'arlieunaissance',
      'lieunaissance',
      'situation',
      'nationalite',
      'arrivede'
    ];

    const r = {};
    titles.forEach( i => {
      r[i] = '';
    });
    return r;
  }

}
