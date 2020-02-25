import { Component, OnInit } from '@angular/core';
import { MysettingsService } from 'src/app/services/mysettings.service';

@Component({
  selector: 'app-findeleve',
  templateUrl: './findeleve.component.html',
  styleUrls: ['./findeleve.component.css']
})
export class FindeleveComponent implements OnInit {
  itemsSmartTableLink; // à changer en supprimer cla
  dataeleve;
  constructor(private service: MysettingsService) { }

  ngOnInit(): void {
    this.itemsSmartTableLink = this.service.itemsSmartTableLink;
  }
  btnclick(params) {
    this.service.setsuspender();
    if (params.nmassar != '') {
      this.dataeleve = this.service.ListEleves.filter(i => i.nmassar == params.nmassar );
    }
    if (params.dnaissance != '') {
      this.dataeleve = this.service.ListEleves.filter(i => i.dnaissance == params.dnaissance );
    }
  }
}
