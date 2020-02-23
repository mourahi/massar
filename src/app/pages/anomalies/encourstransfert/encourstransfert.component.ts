import { Component, OnInit } from '@angular/core';
import { MysettingsService } from 'src/app/services/mysettings.service';

@Component({
  selector: 'app-encourstransfert',
  templateUrl: './encourstransfert.component.html',
  styleUrls: ['./encourstransfert.component.css']
})
export class EncourstransfertComponent implements OnInit {
  dataeleves;
  itemsSmartTableLink;
  constructor(private service: MysettingsService) { }

  ngOnInit(): void {
    this.itemsSmartTableLink = this.service.itemsSmartTableLink;
    this.dataeleves = this.service.ListEleves.filter(i => i.situation === 'في طور التحويل' );
  }

}
