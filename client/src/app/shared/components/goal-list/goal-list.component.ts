import { Component, OnInit, Input } from '@angular/core';
import { IGoal } from '../../models/goal';

@Component({
  selector: 'app-goal-list',
  templateUrl: './goal-list.component.html',
  styleUrls: ['./goal-list.component.css'],
})
export class GoalListComponent implements OnInit {
  @Input() isCurrent: boolean;
  @Input() type: string;
  @Input() data: IGoal[];
  isOpen = true;

  constructor() {}

  ngOnInit(): void {}

  toggleList(): void {
    this.isOpen = !this.isOpen;
  }
}
