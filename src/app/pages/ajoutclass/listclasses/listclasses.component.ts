import { Component, OnInit, Input} from '@angular/core';
import { MysettingsService } from 'src/app/services/mysettings.service';

@Component({
  selector: 'app-listclasses',
  templateUrl: './listclasses.component.html',
  styleUrls: ['./listclasses.component.css']
})
export class ListclassesComponent implements OnInit {
  nameclasses;
  nameuniqueclasses;
  niveauselected;
  constructor(private service: MysettingsService) { }

  ngOnInit() {
    this.nameuniqueclasses = this.service.myClasses;
    this.niveauselected = 'جميع المستويات';
    this.selectedniveau(this.niveauselected);
  }
  selectedniveau(v) {
    this.niveauselected = v;
    this.nameclasses = this.service.getlistNumClasses()
    .map(ii => ({'رمز القسم': ii.numero, المستوى: ii.niveau}));
    if (v != 'جميع المستويات') {
      this.nameclasses = this.nameclasses.filter(i => i.المستوى == v);
    }
  }

}
