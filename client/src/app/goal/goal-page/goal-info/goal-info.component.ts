import { Component, OnInit, Input } from '@angular/core';
import { IGoal } from '../../../shared/models/goal';
import * as moment from 'moment';
import { GoalService } from '../../goal.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-goal-info',
  templateUrl: './goal-info.component.html',
  styleUrls: ['./goal-info.component.css'],
})
export class GoalInfoComponent implements OnInit {
  goal: IGoal;
  time: number;
  isStarted: boolean;
  value: number;
  record: any[];
  topLeftTag = 'Start Date: ';
  topLeftMsg: string = null;
  topRightTag: string = null;
  topRightMsg: string = null;
  middleLeftTag: string = null;
  middleLeftMsg: string = null;
  middleRightTag: string = null;
  middleRightMsg: string = null;
  bottomLeftTag: string = null;
  bottomLeftMsg: string = null;
  bottomRightTag: string = null;
  bottomRightMsg: string = null;

  constructor(private goalService: GoalService) {}

  ngOnInit(): void {
    this.goal = this.goalService.goal;
    this.time = this.goalService.time;
    this.isStarted = this.goalService.isStarted;
    this.record = this.goalService.record;
    this.goalService.value.subscribe((value) => {
      this.value = value;
      this.formatMessages();
    });
  }

  formatMessages(): void {
    const { type, duration, startDate, units, total } = this.goal;
    this.topLeftMsg = `${moment.utc(startDate).format('MMMM Do, YYYY')}`;

    if (this.isStarted) {
      if (type === 0) {
        // passfail
        this.middleLeftTag = 'Success To Date: ';
        this.middleLeftMsg = `${this.value} / ${
          this.time > duration ? this.record.length : this.time + 1
        } (${Math.round((this.value / (this.time + 1)) * 100)}%)`;
        this.bottomLeftTag = 'Success Total: ';
        this.bottomLeftMsg = `${this.value} / ${
          this.record.length
        } (${Math.round((this.value / this.record.length) * 100)}%)`;
      } else if (type === 1) {
        // total
        this.topRightTag = this.time === duration ? 'Duration: ' : 'Day: ';
        this.topRightMsg =
          this.time === duration
            ? `${duration} days`
            : `${this.time + 1} / ${duration}`;
        this.middleLeftTag = 'Total: ';
        this.middleLeftMsg = `${this.value} / ${total} ${units}`;
        this.middleRightTag = 'Goal Completion: ';
        this.middleRightMsg = `${Math.round((this.value / total) * 100)}%`;
      } else if (type === 2) {
        // difference
        this.topRightTag = this.time === duration ? 'Duration: ' : 'Day: ';
        this.topRightMsg =
          this.time === duration
            ? `${duration} days`
            : `${this.time + 1} / ${duration}`;
        this.middleLeftTag = 'Start: ';
        this.middleLeftMsg = `${this.record[0]} ${units}`;
        this.middleRightTag = 'Goal: ';
        this.middleRightMsg = `${total} ${units}`;
        this.bottomLeftTag = this.time === duration ? 'Final: ' : 'Current: ';
        this.bottomLeftMsg = `${this.record[0] + this.value} ${units}`;
        this.bottomRightTag = 'Change: ';
        this.bottomRightMsg = `${this.value > 0 ? '+' : ''}${
          this.value
        } ${units}`;
      }
    } else {
      this.topLeftTag = 'Begins: ';
      this.topRightTag = 'Duration: ';
      this.topRightMsg = `${duration} days`;
      if (type === 1) {
        this.middleLeftTag = 'Goal: ';
        this.middleLeftMsg = `${total} ${units}`;
      } else if (type === 2) {
        this.middleLeftTag = 'Start: ';
        this.middleLeftMsg = `${this.record[0]} ${units}`;
        this.middleRightTag = 'Goal:';
        this.middleRightMsg = `${total} ${units}`;
      }
    }
  }
}
