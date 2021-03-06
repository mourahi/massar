import { Component, OnInit } from '@angular/core';
import { MysettingsService } from 'src/app/services/mysettings.service';

@Component({
  selector: 'app-saisieeleves',
  templateUrl: './saisieeleves.component.html',
  styleUrls: ['./saisieeleves.component.css']
})
export class SaisieelevesComponent implements OnInit {
  dataeleves;
  countries: Array<string>;
  constructor(private service: MysettingsService) { }

  ngOnInit(): void {
    this.service.filtreActive.niveau = this.service.myClasses[0].niveau;
    this.service.filtreActive.classe = this.service.getlistNumClasses()[0].numero;
    this.countries = this.service.getCountries();
    this.showfilterclass();
  }
  delete() {
    this.dataeleves = this.dataeleves.filter( f => f.addcheck != true && f.nmassar != '');
    this.save();
    this.service.setsuspender({etat: 'ok', message:'تمت الحذف بنجاح ....'});
    this.setNewLine();
  }
  save() {
    console.log("this.dataeleves=",this.dataeleves);

    if (this.service.filtreActive.classe.length < 2 ){
      this.service.filtreActive.classe = this.service.getlistNumClasses()[0].numero;
     }
    const nn = Math.max(...(this.service.ListEleves.map( m =>  +m.n)));
    const ra = this.service.ListEleves.filter( f => f.n as number == nn ).map( k => k.nmassar)[0];
    this.service.ListEleves = this.service.ListEleves.filter( j => j.cla != this.service.filtreActive.classe );


    const newmassar ='SF' + (+ra.replace( /^\D+/g, '') + 1);
    let messageErreur = '';
    let err = 0;
    console.log("this.dataeleves saisie =",this.dataeleves);

    this.dataeleves.forEach( k => {
        if (k.addcheck) { k.addcheck = '' ; }
        if (k.dnaissance == '') { messageErreur =  'المرجو ملء تاريخ الازدياد' + '<br>'  ; err += 1; }
        if (k.genre == '') { messageErreur +=  'المرجو ملء الجنس' + '<br>' ; err += 1; }
        if (k.nom == '') { messageErreur +=  'المرجو ملء النسب بالفرنسية' + '<br>' ; err += 1;}
        if (k.prenom == '') { messageErreur +=  'المرجو ملء الاسم بالفرنسية' + '<br>' ; err += 1; }
        if (k.arnom == '') { messageErreur +=  'المرجو ملء النسب بالعربية' + '<br>'; err += 1;}
        if (k.arprenom == '') { messageErreur +=  'المرجو ملء الاسم بالعربية' + '<br>' ; err += 1;}
        console.log("err =", err);
        if (err == 0 || err == 6) {
          if (err == 0 && k.nmassar == ''){
            k.nmassar = newmassar ; k.n = (nn + 1)+'';
            k.niveau = this.service.filtreActive.niveau ;
            k.cla = this.service.filtreActive.classe;
            k.situation = 'يزاول دراسته';
            err = 1;
            console.log('dataeleve:', this.dataeleves);
          } else if (err == 6 && k.nmassar == '') {
            err = 2;
          }
      } else {
       err = 99 ;
      }
    });
    this.service.ListEleves = [...this.service.ListEleves, ...this.dataeleves.filter(i => i.nmassar != '')];
    switch (err) {
      case 1:
        this.service.setsuspender({etat: 'ok', message:'تمت الاضافة بنجاح ....'});
        this.showfilterclass();
        break;
      case 2:
        this.service.setsuspender({etat: 'ok', message:'تمت الحفظ بنجاح ....'});

        break;
        case 99:
        this.service.setsuspender({etat: 'err', message: messageErreur});
    }
  }

  showfilterclass() {
    if (this.service.filtreActive.classe == '*') {
      this.service.filtreActive.classe = this.service.getlistNumClasses()
         .filter(c => c.niveau == this.service.filtreActive.niveau)[0].numero;
   }

    const d = this.service.ListEleves.filter(i => i.cla == this.service.filtreActive.classe);
    this.dataeleves = JSON.parse(JSON.stringify(d));
    this.setNewLine();


  }
  setNewLine() {
    console.log('this.service.filtreActive.classe.split(\'-\')[0]=',this.service.filtreActive.classe.split('-')[0]);

    if (this.service.filtreActive.classe.split('-')[0] == '1APG'){
    const titles =  [
      'n',
      'cla',
      'nmassar',
      'nom',
      'prenom',
      'arnom',
      'arprenom',
      'genre',
      'dnaissance',
      'arlieunaissance',
      'lieunaissance',
      'situation',
      'nationalite',
      'arrivede'
    ];

    const r = {};
    titles.forEach( i => {
      r[i] = '';
    });
    this.dataeleves.push(r);
  }
  }

}
