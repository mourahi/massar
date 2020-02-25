import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MysettingsService } from 'src/app/services/mysettings.service';

@Component({
  selector: 'app-ficheleve',
  templateUrl: './ficheleve.component.html',
  styleUrls: ['./ficheleve.component.css']
})
export class FicheleveComponent implements OnInit {
  arraytab: string[];
  n = '';
  eleve;
  itab;
  constructor(private route: ActivatedRoute, private service: MysettingsService) {
    this.service.setsuspender();
   }

  ngOnInit(): void {
    this.route.params.subscribe(nm => {
      this.eleve = nm.n ? this.service.ListEleves.filter(i => i.n == nm.n)[0] :
      this.service.ListEleves.filter(i => i.nmassar == nm.nmassar)[0];
    });
    this.arraytab = [
          'معلومات التلميذ',
          'الولي',
          'التمدرس',
          'شهادة المغادرة',
          'الانقطاع و اعادة الادماج',
          'الدعم'
        ];
  }
  indexTab(i) {
    this.itab = i;
  }

}
