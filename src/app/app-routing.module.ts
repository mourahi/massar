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


const routes: Routes = [
  {path: '', component: ContenuComponent},
  {path: 'listeleves', component: ListelevesComponent},
  {path: 'ajoutclass', component: AjoutclassComponent},
  {path: 'distributioneleves', component: DistributionelevesComponent},
  {path: 'reinscription', component: ReinscriptionComponent},
  {path: 'anomalietransfer', component: EncourstransfertComponent},
  {path: 'anomalienationalite', component: AnomalienationnaliteComponent},
  {path: 'ficheeleve/:n', component: FicheleveComponent},
  {path: 'findeleve', component: FindeleveComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }