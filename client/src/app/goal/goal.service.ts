import { Injectable } from '@angular/core';
import { dummyGoals } from './dummyData';
import { IGoal } from '../shared/models/goal';
import { getTimeWithStatus } from '../shared/functions/sharedFunctions';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GoalService {
  goals: IGoal[];
  goal: IGoal;
  record: any[];
  time: number;
  isStarted: boolean;
  isComplete: boolean;
  isActive: boolean;
  valueSource = new BehaviorSubject<number>(null);
  value = this.valueSource.asObservable();

  constructor(private router: Router) {
    this.goals = dummyGoals;
  }

  // get user goals

  // set goal
  setGoal(id: string): void {
    this.goal = this.goals.filter((goal) => goal.id === id)[0];
    const [isStarted, time, isComplete] = getTimeWithStatus(
      this.goal.startDate,
      this.goal.duration
    );
    this.isStarted = isStarted;
    this.time = time;
    this.isComplete = isComplete;
    this.isActive = time < this.goal.duration;
    this.setRecord();
    this.getValue();
  }

  setRecord(): void {
    this.record = this.goal.tracker;
    if (
      this.record &&
      this.record[this.time] === undefined &&
      this.goal.type === 0
    ) {
      while (this.record.length <= this.time) {
        if (this.goal.type === 0) {
          this.record.push(false);
        } else if (this.goal.type === 1) {
          this.record.push(0);
        } else if (this.goal.type === 2) {
          this.record.push(null);
        }
      }
    }
  }

  updateRecord(index: number, value: any): void {
    this.record[index] = value;
    this.getValue();
  }

  getValue(): void {
    if (this.goal.type === 0) {
      this.valueSource.next(
        this.record.reduce((a, b) => (b ? (a += 1) : a), 0)
      );
    } else if (this.goal.type === 1) {
      this.valueSource.next(this.record.reduce((a, b) => (a += b), 0));
    } else if (this.goal.type === 2) {
      const temp = this.record.filter((value) => value !== null);
      this.valueSource.next(temp.pop() - this.record[0]);
    }
  }

  // update goal tracker
  saveTracker(): void {
    console.log('Tracker saved!');
  }

  // add goal
  addGoal(): void {
    console.log('Goal added!');
  }

  // update goal
  updateGoal(): void {
    console.log('Goal updated!');
  }

  // delete goal
  deleteGoal(): void {
    console.log('Goal deleted!');
    this.router.navigate(['/']);
  }
}
