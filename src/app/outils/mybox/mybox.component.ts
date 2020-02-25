import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MysettingsService } from 'src/app/services/mysettings.service';

@Component({
  selector: 'app-mybox',
  templateUrl: './mybox.component.html',
  styleUrls: ['./mybox.component.css']
})
export class MyboxComponent implements OnInit {
  @Input() databox: {title: string, valeur: number, icon: string, path: string, bg: string};

  constructor(private route: Router, private service: MysettingsService) { }
  ngOnInit() {}
  openDetails(p) {
    this.service.setsuspender();
    this.route.navigate([this.databox.path]);
  }

}
