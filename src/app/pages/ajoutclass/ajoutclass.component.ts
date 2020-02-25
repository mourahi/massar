import { Component, OnInit, ViewChild } from '@angular/core';
import { MysettingsService } from 'src/app/services/mysettings.service';
import { ListclassesComponent } from './listclasses/listclasses.component';

@Component({
  selector: 'app-ajoutclass',
  templateUrl: './ajoutclass.component.html',
  styleUrls: ['./ajoutclass.component.css']
})
export class AjoutclassComponent implements OnInit {
  @ViewChild(ListclassesComponent) mychild: ListclassesComponent;
  myStructure;
  newKeysname = {id: 'hide', name: 'المستوى', nbrPlan: 'الخريطة', nbrEnreg: 'عدد الاقسام'};
  listclasses;


  constructor(private service: MysettingsService) { }

  ngOnInit() {
   this.myStructure = JSON.parse(JSON.stringify(this.service.myClasses));
    }

saved() {
  const  resultat = this.VerificationBeforeChangeClasses();
  if( resultat.length > 0) {
    this.service.setsuspender({etat: 'err', message : resultat});
  } else {
    this.service.setsuspender({etat: 'ok', message : ''});
    this.service.myClasses = JSON.parse(JSON.stringify(this.myStructure));
    this.mychild.ngOnInit();
  }
}
VerificationBeforeChangeClasses() {
  let claToVerifier = '';
  for (let index = 0; index < this.service.myClasses.length; index++) {
    const itemMyclasses = this.service.myClasses[index];
    const itemMyStructure = this.myStructure[index];
    const di = itemMyclasses.nbrEnreg - itemMyStructure.nbrEnreg;
    if (di > 0) {
        const da = new Array(di);
        for (let i = 0; i < di; i++) {
          da[i] = itemMyclasses.cla + '-' + (itemMyclasses.nbrEnreg - i);
        }
        if (this.service.ListEleves.filter(ii => da.indexOf(ii.cla) > -1).length > 0) {
          claToVerifier += da.join(' ') + ' ';
        }
    }
  }
  return claToVerifier;
}


}
