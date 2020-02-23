import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tatbikati',
  templateUrl: './tatbikati.component.html',
  styleUrls: ['./tatbikati.component.css']
})
export class TatbikatiComponent implements OnInit {
  showit = false;
  data = [
    {title: 'INSAT', img: 'ec-1.png', path: ''},
    {title: 'MOWAKABA', img: 'ec-2.png', path: ''},
    {title: 'MasiRH', img: 'ec-3.png', path: ''},
    {title: 'GRESA', img: 'ec-4.png', path: ''},
    {title: 'Haraka', img: 'ec-5.png', path: ''},
    {title: 'Taysir', icon: 'fa fa-user', path: ''},
    {title: 'SRH', icon: 'fa fa-user', path: ''},
    {title: 'ESISE', img: 'ec-4.png', path: ''},
    {title: 'Carte scolaire', icon: 'fa fa-credit-card', path: ''},
    {title: 'Exporateur SI', img: 'ec-4.png', path: ''},
    {title: 'DocFlow', icon: 'fa fa-envelope-o', path: ''},
    {title: 'Suiv budget', img: 'ec-4.png', path: ''},
    {title: 'Tabligh', icon: 'fa fa-user', path: ''}
  ];
  constructor() { }

  ngOnInit() {
  }

}
