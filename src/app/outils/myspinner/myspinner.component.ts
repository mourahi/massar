import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { MysettingsService } from 'src/app/services/mysettings.service';

@Component({
  selector: 'app-myspinner',
  templateUrl: './myspinner.component.html',
  styleUrls: ['./myspinner.component.css']
})
export class MyspinnerComponent implements OnInit {
  suspender: Subscription ;
  etatshowit = false;
  info;

  constructor(private service: MysettingsService) {
      this.suspender = this.service.getsuspender().subscribe(s => {
          this.etatshowit = !this.etatshowit;
          setTimeout(() => {
            this.etatshowit = false;
            if (s.etat != '') {
              this.info = s;
              (document.getElementById('modalbutton') as HTMLElement).click();
            }
           }, 800);
      });
   }

  ngOnInit() {
  }

}
