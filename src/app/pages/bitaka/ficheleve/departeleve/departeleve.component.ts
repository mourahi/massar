import { Component, OnInit, Input } from '@angular/core';
import { MysettingsService } from 'src/app/services/mysettings.service';

@Component({
  selector: 'app-departeleve',
  templateUrl: './departeleve.component.html',
  styleUrls: ['./departeleve.component.css']
})
export class DeparteleveComponent implements OnInit {
  @Input() nmassar;
  departs;
  constructor(private service: MysettingsService) { }

  ngOnInit(): void {
   this.filterdeparts();
  }
  filterdeparts(){
    this.departs = this.service.ListDeparts.filter(i => i.nmassar == this.nmassar);
  }
  save(ddep) {
    this.service.setsuspender('');
    this.service.ListDeparts.push({
      nmassar: this.nmassar,
      ascolaire: '2019/2020',
      ecoleorigine: 'مدرسة الرحمة d111',
      ddepart: ddep,
      ecoledestination:'',
      dreception: ''
    });
    this.filterdeparts();
    this.changeSituation('في طور التحويل');
  }
  changeSituation(v) {
    this.service.ListEleves.filter(i => i.nmassar == this.nmassar)[0].situation = v;
  }

  cancel() {
    this.service.setsuspender('');
    if (this.departs.length > 0){
      this.service.ListDeparts = this.service.ListDeparts.filter(i => i.nmassar != this.nmassar);
      this.filterdeparts();
      if (this.departs.length == 0){
        const l = this.service.ListSorties.filter(i => i.nmassar == this.nmassar);
        if (l.length > 0){
          this.changeSituation(l[l.length - 1].situation);
        }else {
          this.changeSituation('يزاول دراسته');
        }

      }
    }
  }
}
