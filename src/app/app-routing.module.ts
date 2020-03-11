import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContenuComponent } from './mypage/contenu/contenu.component';
import { ListelevesComponent } from './pages/bitaka/listeleves/listeleves.component';
import { AjoutclassComponent } from './pages/ajoutclass/ajoutclass.component';
import { DistributionelevesComponent } from './pages/distributioninscription/distributioneleves/distributioneleves.component';
import { ReinscriptionComponent } from './pages/distributioninscription/reinscription/reinscription.component';
import { EncourstransfertComponent } from './pages/anomalies/encourstransfert/encourstransfert.component';
import { AnomalienationnaliteComponent } from './pages/anomalies/anomalienationnalite/anomalienationnalite.component';
import { FicheleveComponent } from './pages/bitaka/ficheleve/ficheleve.component';
import { FindeleveComponent } from './pages/bitaka/findeleve/findeleve.component';
import { PrelistelevesComponent } from './pages/saisiepreliminaire/listeleves/prelisteleves.component';
import { CorrectpositionComponent } from './pages/saisiepreliminaire/correctposition/correctposition.component';
import { SaisieelevesComponent } from './pages/saisiepreliminaire/saisieeleves/saisieeleves.component';
import { ReceptioneleveComponent } from './pages/mobilite/receptioneleve/receptioneleve.component';


const routes: Routes = [
  {path: '', component: ContenuComponent},
  {path: 'listeleves', component: ListelevesComponent},
  {path: 'ajoutclass', component: AjoutclassComponent},
  {path: 'distributioneleves', component: DistributionelevesComponent},
  {path: 'reinscription', component: ReinscriptionComponent},
  {path: 'anomalietransfer', component: EncourstransfertComponent},
  {path: 'anomalienationalite', component: AnomalienationnaliteComponent},
  {path: 'ficheeleve/:n', component: FicheleveComponent},
  {path: 'findeleve', component: FindeleveComponent},
  {path: 'prelisteleve', component: PrelistelevesComponent},
  {path: 'correctposition/:n', component: CorrectpositionComponent},
  {path: 'saisieeleves', component: SaisieelevesComponent},
  {path: 'receptioneleve', component: ReceptioneleveComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
