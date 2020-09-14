import { Component, OnInit } from '@angular/core';
import { IGoal } from '../shared/models/goal';
import { GoalService } from '../goal/goal.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allGoals: IGoal[];
  currentGoals: IGoal[] = [];
  currentCompetitions: IGoal[] = [];
  pastGoals: IGoal[] = [];
  pastCompetitions: IGoal[] = [];

  constructor(private goalService: GoalService) {}

  ngOnInit(): void {
    this.allGoals = this.goalService.goals;
    const active = this.allGoals.filter(
      (goal) =>
        moment().startOf('day').diff(goal.startDate, 'days') + 1 <=
        goal.duration
    );
    const past = this.allGoals.filter(
      (goal) =>
        moment().startOf('day').diff(goal.startDate, 'days') + 1 > goal.duration
    );
    this.currentGoals = active.filter((goal) => goal.compId === null);
    this.currentCompetitions = active.filter((goal) => goal.compId !== null);
    this.pastGoals = past.filter((goal) => goal.compId === null);
    this.pastCompetitions = past.filter((goal) => goal.compId !== null);
  }
}
