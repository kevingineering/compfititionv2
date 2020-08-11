import { Component, OnInit } from '@angular/core';
import { GoalService } from '../../goal.service';

@Component({
  selector: 'app-goal-buttons',
  templateUrl: './goal-buttons.component.html',
  styleUrls: ['./goal-buttons.component.css'],
})
export class GoalButtonsComponent implements OnInit {
  isStarted: boolean;
  isActive: boolean;
  isOwner: boolean;
  deleteToggle = false;

  constructor(private goalService: GoalService) {}

  ngOnInit(): void {
    this.isStarted = this.goalService.isStarted;
    this.isActive = this.goalService.isActive;
    this.isOwner = true; // TODO
  }

  saveGoal(): void {
    this.goalService.saveTracker();
  }

  deleteGoal(): void {
    this.goalService.deleteGoal();
  }

  setDeleteToggle(): void {
    this.deleteToggle = !this.deleteToggle;
  }
}
