import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalListComponent } from './components/goal-list/goal-list.component';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { FriendItemComponent } from './components/friend-item/friend-item.component';
import { RequestItemComponent } from './components/request-item/request-item.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { GoalModule } from '../goal/goal.module';

@NgModule({
  declarations: [
    GoalListComponent,
    FormFieldComponent,
    ListItemComponent,
    FriendItemComponent,
    RequestItemComponent,
    NavbarComponent,
  ],
  imports: [CommonModule, RouterModule, GoalModule],
  exports: [GoalListComponent, NavbarComponent],
})
export class SharedModule {}
