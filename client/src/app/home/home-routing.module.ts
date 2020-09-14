import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { GoalPageComponent } from '../goal/goal-page/goal-page.component';
import { GoalFormComponent } from '../goal/goal-form/goal-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'goalform', component: GoalFormComponent },
  { path: 'goal/:id', component: GoalPageComponent },
  {
    path: 'competition/:id',
    loadChildren: () =>
      import('../competition/competition.module').then(
        (mod) => mod.CompetitionModule
      ),
  },
  { path: 'competitionform', component: HomeComponent },
  { path: 'user', component: HomeComponent },
  { path: 'friend', component: HomeComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
