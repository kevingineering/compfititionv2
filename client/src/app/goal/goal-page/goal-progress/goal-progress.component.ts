import { Component, OnInit } from '@angular/core';
import { IGoal } from '../../../shared/models/goal';
import { GoalService } from '../../goal.service';

@Component({
  selector: 'app-goal-progress',
  templateUrl: './goal-progress.component.html',
  styleUrls: ['./goal-progress.component.css'],
})
export class GoalProgressComponent implements OnInit {
  time: number;
  goal: IGoal;
  record: any[];
  today: number | '';
  yesterday: number | '';

  constructor(private goalService: GoalService) {}

  ngOnInit(): void {
    this.goal = this.goalService.goal;
    this.time = this.goalService.time;
    this.record = this.goalService.record;
    this.today = this.record[this.time];
    this.yesterday = this.record[this.time - 1];
  }

  // TODO
  onEntry(field: any): void {
    if (field.value === '') {
      return null;
    }
    let value = parseFloat(field.value);
    if (field.name === 'today') {
      if (value < 0) {
        this.today = 0;
        value = 0;
      }
      this.today = field.value;
      if (this.goal.type === 2) {
        this.goalService.updateRecord(this.time, value);
      } else if (this.goal.type === 1) {
        this.goalService.updateRecord(this.time, value);
      }
    } else {
      if (value < 0) {
        this.yesterday = 0;
        value = 0;
      }
      this.yesterday = field.value;
      this.goalService.updateRecord(this.time - 1, value);
    }
  }
}
