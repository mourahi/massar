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
 types;
 cycles;
  constructor(private service: MysettingsService) { }

  ngOnInit() {

    this.types = this.service.types;
    this.cycles = this.service.cycles;
    this.mylist = [{d: 'PDF'}, {d: 'XLS'}];
    this.listniveaux = this.service.myClasses.slice();
    this.getactivelistniveau(this.listniveaux[0].niveau);
    this.service.filtreActive = {ascolaire: '2019/2020', types: this.types[0],
        cycle: this.cycles[0], niveau: this.listniveaux[0].niveau,
        classe: ''};
  }

  settFiltreActive(e) {
    console.log("avant, class",e,this.service.filtreActive.classe);

    switch (e.id) {
      case 'types':

        break;
      case 'cycle':

        break;
      case 'niveau':
        this.getactivelistniveau(e.value);
        this.service.filtreActive.classe = '*';
        break;
      case 'classe':
        this.service.filtreActive.classe = e.value;
    }
    this.service.filtreActive[e.id] = e.value;
    console.log("avant, class ",e,this.service.filtreActive.classe );
  }
  settFiltreActiveForDistribu(e) {
      this.settFiltreActive(e);
      this.btnclick('');
  }


  getactivelistniveau(v) {
    console.log("niveau v = ",v);

    this.listnumerosclasses = this.service.listNumClasses.filter(i => i.niveau == v).slice();
  }
  btnclick(v) { // v = save or find
    if (v != 'save') {
      this.service.setsuspender();
    }
    this.save.emit(null);
  }

}
