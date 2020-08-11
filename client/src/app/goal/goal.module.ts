import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleChartsModule } from 'angular-google-charts';
import { GoalPageComponent } from './goal-page/goal-page.component';
import { GoalProgressComponent } from './goal-page/goal-progress/goal-progress.component';
import { GoalInfoComponent } from './goal-page/goal-info/goal-info.component';
import { GoalButtonsComponent } from './goal-page/goal-buttons/goal-buttons.component';
import { PassFailChartComponent } from './goal-page/pass-fail-chart/pass-fail-chart.component';
import { TotalChartComponent } from './goal-page/total-chart/total-chart.component';
import { DifferenceChartComponent } from './goal-page/difference-chart/difference-chart.component';

@NgModule({
  declarations: [
    GoalPageComponent,
    GoalProgressComponent,
    GoalInfoComponent,
    GoalButtonsComponent,
    PassFailChartComponent,
    TotalChartComponent,
    DifferenceChartComponent,
  ],
  imports: [CommonModule, GoogleChartsModule],
  exports: [
    GoalPageComponent,
    GoalProgressComponent,
    GoalInfoComponent,
    GoalButtonsComponent,
  ],
})
export class GoalModule {}
