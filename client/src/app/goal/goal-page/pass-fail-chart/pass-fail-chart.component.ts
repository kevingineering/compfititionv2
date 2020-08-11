import { Component, OnInit } from '@angular/core';
import { IGoal } from '../../../shared/models/goal';
import * as moment from 'moment';
import { GoalService } from '../../goal.service';
import { AlertService } from '../../../alert/alert.service';

@Component({
  selector: 'app-pass-fail-chart',
  templateUrl: './pass-fail-chart.component.html',
  styleUrls: ['./pass-fail-chart.component.css'],
})
export class PassFailChartComponent implements OnInit {
  goal: IGoal;
  time: number;
  isComplete: boolean;
  // @Input() isOwner: boolean;
  record: any[];
  weeks: any[];
  days: any[];

  constructor(
    private goalService: GoalService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.goal = this.goalService.goal;
    this.time = this.goalService.time;
    this.isComplete = this.goalService.isComplete;
    this.record = this.goalService.record;
    this.days = new Array(this.goal.total);
    this.weeks = new Array(this.goal.duration / 7);
  }

  handleClick(a: string): void {
    // TODO - check if isOwner
    if (this.isComplete) {
      return null;
    }
    const clickLoc = parseInt(a, 10);
    if (this.time === clickLoc || this.time === clickLoc + 1) {
      this.alertService.clearAlert();
      let value;
      if (this.record[clickLoc] === true) {
        value = false;
      } else {
        value = true;
      }
      this.updateRecord(clickLoc, value);
    } else {
      this.alertService.setAlert(
        'You can only record data for today and yesterday.'
      );
    }
  }

  getWeekDate(i: number): string {
    return moment
      .utc(this.goal.startDate)
      .add(7 * i, 'day')
      .format('MMM Do');
  }

  updateRecord(index: number, value: any): void {
    this.goalService.updateRecord(index, value);
  }
}
