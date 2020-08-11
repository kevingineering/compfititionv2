import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GoalPageComponent } from './goal/goal-page/goal-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'goalform', component: HomeComponent },
  { path: 'goal/:id', component: GoalPageComponent },
  { path: 'register', component: HomeComponent },
  { path: 'login', component: HomeComponent },
  { path: 'user', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

// TODO - lazy load modules
