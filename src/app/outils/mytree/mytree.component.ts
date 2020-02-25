import { Component, OnInit, Input } from '@angular/core';
import { MysettingsService } from 'src/app/services/mysettings.service';

@Component({
  selector: 'app-mytree',
  templateUrl: './mytree.component.html',
  styleUrls: ['./mytree.component.css']
})
export class MytreeComponent implements OnInit {
  mytitle;
  @Input()
    set title(v: string){
      this.mytitle = v;
      this.ngOnInit();
    }
  data;
  sho = -1;
  subsho = -1;

  constructor(private service: MysettingsService) { }
  ngOnInit() {
    this.data = this.service.getMenu(this.mytitle);
  }

  showsubmenu(i, ex) {
    if (ex == undefined) { this.service.setsuspender(); }
    if (i  == this.sho) {
    if (ex != undefined) {
      this.sho = -1; }
    } else {
      this.sho = i;
    }
  }
  clicksubmenu(j) {
    this.subsho = j;
    this.service.setsuspender();
  }

}
