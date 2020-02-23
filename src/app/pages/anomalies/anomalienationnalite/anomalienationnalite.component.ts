import { Component, OnInit } from '@angular/core';
import { MysettingsService } from 'src/app/services/mysettings.service';

@Component({
  selector: 'app-anomalienationnalite',
  templateUrl: './anomalienationnalite.component.html',
  styleUrls: ['./anomalienationnalite.component.css']
})
export class AnomalienationnaliteComponent implements OnInit {

  dataeleves;
  itemsSmartTableLink;
  constructor(private service: MysettingsService) { }

  ngOnInit(): void {
    this.itemsSmartTableLink = this.service.itemsSmartTableLink;
    this.dataeleves = this.service.ListEleves.filter(i => i.nationalite === '' );
  }

}
