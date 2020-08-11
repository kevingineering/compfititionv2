import { Component, OnInit, Input } from '@angular/core';
import { IGoal, goalTypeDescriptors, GoalTypeEnum } from '../../models/goal';
import { getTimeWithStatus } from '../../functions/sharedFunctions';
import * as moment from 'moment';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
})
export class ListItemComponent implements OnInit {
  @Input() goal: IGoal;
  day: number;
  time: number;
  topField: string;
  bottomField: string = null;

  constructor() {}

  ngOnInit(): void {
    const [isStarted, time, isComplete] = getTimeWithStatus(
      this.goal.startDate,
      this.goal.duration
    );
    this.time = time;
    const descriptor = goalTypeDescriptors[this.goal.type];
    let result = '';

    switch (this.goal.type) {
      case GoalTypeEnum.passfail:
        result = `${2} / ${time === this.goal.duration ? time : time + 1}`;
        break;
      case GoalTypeEnum.total:
        result = `${2} ${this.goal.units}`;
        break;
      case GoalTypeEnum.difference:
        result = `${2 > 0 ? '+' : '-'}${2} ${this.goal.units}`;
        break;
      default:
        break;
    }

    if (!isComplete) {
      this.topField = isStarted
        ? `<strong>Day: </strong>${time + 1} / ${this.goal.duration}`
        : 'Begins';
      this.bottomField = isStarted
        ? `<strong>${descriptor}: </strong>${result}`
        : moment(this.goal.startDate).format('MMM Do');
    } else {
      this.topField = `<strong>Final ${descriptor}: </strong>${result}`;
    }
  }
}
