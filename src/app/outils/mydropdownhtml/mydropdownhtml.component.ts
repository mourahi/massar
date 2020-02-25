import { Component, OnInit, Input } from '@angular/core';
import { MysettingsService } from 'src/app/services/mysettings.service';

@Component({
  selector: 'app-mydropdownhtml',
  templateUrl: './mydropdownhtml.component.html',
  styleUrls: ['./mydropdownhtml.component.css']
})
export class MydropdownhtmlComponent implements OnInit {
  mydata = [
    {title: 'الدخول المدرسي', icon: 'fa fa-users fa-2x', path: ''},
    {title: 'التقييم', icon: 'fa fa-edit fa-2x', path: ''},
    {title: 'الموارد البشرية', icon: 'fa fa-users fa-2x', path: ''},
    {title: 'الدعم الاجتماعي و التربوي', icon: 'fa fa-edit fa-2x', path: ''},
    {title: 'الحياة المدرسية', icon: 'fa fa-user fa-2x', path: ''},
    {title: 'مشروع المؤسسة', icon: 'fa fa-edit fa-2x', path: ''}

  ];
  title = '';
  showit = false;
  constructor(private service: MysettingsService) { }
  hide(){
    this.showit = false;
  }
  ngOnInit() {
    this.title = this.mydata[0].title;
  }
  clicktitle(t){
    this.service.setsuspender();
    this.title = t;
    this.showit = false;
  }

}
