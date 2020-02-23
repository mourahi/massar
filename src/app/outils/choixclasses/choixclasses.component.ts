import { Component, OnInit, Output, EventEmitter, ViewEncapsulation, Input } from '@angular/core';
import { MysettingsService } from 'src/app/services/mysettings.service';

@Component({
  selector: 'app-choixclasses',
  templateUrl: './choixclasses.component.html',
  styleUrls: ['./choixclasses.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class ChoixclassesComponent implements OnInit {
 @Output() save = new EventEmitter();
 @Input() choixSelect = -1;
 mylist;
 showit;
 listnumerosclasses;
 listniveaux;
 typeEnseignement;
 cycle;
  constructor(private service: MysettingsService) { }

  ngOnInit() {

    this.typeEnseignement = this.service.typeEnseignement;
    this.cycle = this.service.cycle;
    this.mylist = [{d: 'PDF'},{d:'XLS'}];
    this.listniveaux = this.service.myClasses.slice();
    this.getactivelistniveau(this.listniveaux[0].niveau);
    this.service.filtreActive = {typeEnseignement: this.typeEnseignement[0],
        cycle: this.cycle[0], niveau: this.listniveaux[0].niveau, classe: ''};
  }

  settFiltreActive(e){
    switch (e.id) {
      case 'typeEnseignement':

        break;
      case 'cycle':

        break;
      case 'niveau':
        this.getactivelistniveau(e.value);
        this.service.filtreActive.classe = "*";
        break;
      case 'classe':
        this.service.filtreActive.classe = e.id;

    }
    this.service.filtreActive[e.id] = e.value;
  }
  settFiltreActiveForDistribu(e){
      this.settFiltreActive(e);
      this.btnclick('');
  }


  getactivelistniveau(v) {
    this.listnumerosclasses = this.service.listNumClasses.filter(i => i.niveau == v).slice();
  }
  btnclick(v) { // v = save or find
    if (v != 'save') {
      this.service.setsuspender('');
    }
    this.save.emit(null);
  }

}
