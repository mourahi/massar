import { Component, OnInit, Input } from '@angular/core';
import { MysettingsService } from 'src/app/services/mysettings.service';

@Component({
  selector: 'app-infoeleve',
  templateUrl: './infoeleve.component.html',
  styleUrls: ['./infoeleve.component.css']
})
export class InfoeleveComponent implements OnInit {
  @Input() eleve;
  constructor(private service: MysettingsService) { }

  ngOnInit(): void {}
  save() {
    this.service.setsuspender({etat: 'ok', message: ''});
    this.service.ListEleves.forEach(element => {
      if (element.n == this.eleve.n) {
        element = this.eleve;
        return false;
      }
    });
  }

  onFileChanged(event) { // called each time file input changes
    this.service.setsuspender();
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (e) => { // called once readAsDataURL is completed
        this.eleve.image = e.target.result;
      };
    }
}

}
