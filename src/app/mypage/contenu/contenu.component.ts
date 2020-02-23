import { Component, OnInit } from '@angular/core';
import { MysettingsService } from 'src/app/services/mysettings.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-contenu',
  templateUrl: './contenu.component.html',
  styleUrls: ['./contenu.component.css']
})
export class ContenuComponent implements OnInit {
  mydata;
  myboxdata;
  myboxdataErr;
  mychartdatas;
  constructor(private service: MysettingsService) {

  }
  ngOnInit() {

      this.mydata = this.service.ListEleves.slice();
      this.myboxdata = this.service.getBoxAccueil();
      this.myboxdataErr = this.service.getBoxAccueilErr();
      this.mychartdatas = this.service.getChartsAccueil();

   }




}
