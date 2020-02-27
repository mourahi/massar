import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MytreeComponent } from './outils/mytree/mytree.component';
import { ContenuComponent } from './mypage/contenu/contenu.component';
import { MydropdownComponent } from './outils/mydropdown/mydropdown.component';
import { MydropdownhtmlComponent } from './outils/mydropdownhtml/mydropdownhtml.component';
import { MysafehtmlpipePipe } from './outils/mysafehtmlpipe.pipe';
import { TatbikatiComponent } from './mypage/tatbikati/tatbikati.component';
import { MycontainerComponent } from './mypage/mycontainer/mycontainer.component';
import { MyuserComponent } from './mypage/myuser/myuser.component';
import { ChoixclassesComponent } from './outils/choixclasses/choixclasses.component';
import { ListelevesComponent } from './pages/bitaka/listeleves/listeleves.component';
import { AjoutclassComponent } from './pages/ajoutclass/ajoutclass.component';
import { MytableComponent } from './outils/mytable/mytable.component';
import { ListclassesComponent } from './pages/ajoutclass/listclasses/listclasses.component';
import { MymodalComponent } from './outils/mymodal/mymodal.component';
import { MyspinnerComponent } from './outils/myspinner/myspinner.component';
import { DistributionelevesComponent } from './pages/distributioninscription/distributioneleves/distributioneleves.component';
import { MytabComponent } from './outils/mytab/mytab.component';
import { SmarttableComponent } from './outils/smarttable/smarttable.component';
import { MyboxComponent } from './outils/mybox/mybox.component';
import { MychartComponent } from './outils/mychart/mychart.component';
import { ReinscriptionComponent } from './pages/distributioninscription/reinscription/reinscription.component';
import { EncourstransfertComponent } from './pages/anomalies/encourstransfert/encourstransfert.component';
import { AnomalienationnaliteComponent } from './pages/anomalies/anomalienationnalite/anomalienationnalite.component';
import { FicheleveComponent } from './pages/bitaka/ficheleve/ficheleve.component';
import { InfoeleveComponent } from './pages/bitaka/ficheleve/infoeleve/infoeleve.component';
import { WalieleveComponent } from './pages/bitaka/ficheleve/walieleve/walieleve.component';
import { ScolariteeleveComponent } from './pages/bitaka/ficheleve/scolariteeleve/scolariteeleve.component';
import { DeparteleveComponent } from './pages/bitaka/ficheleve/departeleve/departeleve.component';
import { SortieeleveComponent } from './pages/bitaka/ficheleve/sortieeleve/sortieeleve.component';
import { AppuieleveComponent } from './pages/bitaka/ficheleve/appuieleve/appuieleve.component';
import { FindeleveComponent } from './pages/bitaka/findeleve/findeleve.component';
import { PrelistelevesComponent } from './pages/saisiepreliminaire/listeleves/prelisteleves.component';
import { CorrectpositionComponent } from './pages/saisiepreliminaire/correctposition/correctposition.component';
import { SaisieelevesComponent } from './pages/saisiepreliminaire/saisieeleves/saisieeleves.component';
@NgModule({
  declarations: [
    AppComponent,
    MytreeComponent,
    ContenuComponent,
    MydropdownComponent,
    MydropdownhtmlComponent,
    MysafehtmlpipePipe,
    TatbikatiComponent,
    MycontainerComponent,
    MyuserComponent,
    ListelevesComponent,
    AjoutclassComponent,
    MytableComponent,
    ListclassesComponent,
    MymodalComponent,
    MyspinnerComponent,
    DistributionelevesComponent,
    ChoixclassesComponent,
    MytabComponent,
    SmarttableComponent,
    MyboxComponent,
    MychartComponent,
    ReinscriptionComponent,
    EncourstransfertComponent,
    AnomalienationnaliteComponent,
    FicheleveComponent,
    InfoeleveComponent,
    WalieleveComponent,
    ScolariteeleveComponent,
    DeparteleveComponent,
    SortieeleveComponent,
    AppuieleveComponent,
    FindeleveComponent,
    PrelistelevesComponent,
    CorrectpositionComponent,
    SaisieelevesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
