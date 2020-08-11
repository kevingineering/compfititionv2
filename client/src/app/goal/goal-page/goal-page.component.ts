import { Component, OnInit } from '@angular/core';
import { IGoal } from '../../shared/models/goal';
import { getTimeWithStatus } from '../../shared/functions/sharedFunctions';
import { GoalService } from '../goal.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-goal-page',
  templateUrl: './goal-page.component.html',
  styleUrls: ['./goal-page.component.css'],
})
export class GoalPageComponent implements OnInit {
  goal: IGoal;
  isStarted: boolean;
  isComplete: boolean;

  constructor(
    private goalService: GoalService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.goalService.setGoal(this.activatedRoute.snapshot.params.id);
    this.goal = this.goalService.goal;
    this.isStarted = this.goalService.isStarted;
    this.isComplete = this.goalService.isComplete;
  }
}
