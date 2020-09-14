import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompetitionFormComponent } from './lists/competition-form/competition-form.component';
import { CompetitionParticipantRequestComponent } from './competition-participant-request/competition-participant-request.component';
import { CompetitionInviteComponent } from './lists/competition-invite/competition-invite.component';
import { CompetitionInvitesComponent } from './lists/competition-invites/competition-invites.component';
import { CompetitionInviteItemComponent } from './lists/competition-invite-item/competition-invite-item.component';
import { CompetitionLeaderboardComponent } from './lists/competition-leaderboard/competition-leaderboard.component';
import { CompetitionLeaderboardItemComponent } from './lists/competition-leaderboard-item/competition-leaderboard-item.component';
import { CompetitionParticipantButtonsComponent } from './lists/competition-participant-buttons/competition-participant-buttons.component';
import { CompetitionParticipantItemComponent } from './lists/competition-participant-item/competition-participant-item.component';
import { CompetitionParticipantsComponent } from './lists/competition-participants/competition-participants.component';
import { CompetitionAdminRequestItemComponent } from './lists/competition-admin-request-item/competition-admin-request-item.component';
import { CompetitionRequestsComponent } from './lists/competition-admin-requests/competition-admin-requests.component';
import { CompetitionPageComponent } from './competition-page.component';
import { CompetitionRoutingModule } from './competition-routing.module';
import { CompetitionListsComponent } from './lists/competition-lists/competition-lists.component';
import { CompetitionButtonsComponent } from './table/competition-buttons/competition-buttons.component';
import { CompetitionChartComponent } from './table/competition-chart/competition-chart.component';
import { CompetitionChartDifferenceComponent } from './table/competition-chart-difference/competition-chart-difference.component';
import { CompetitionChartPassFailComponent } from './table/competition-chart-pass-fail/competition-chart-pass-fail.component';
import { CompetitionChartTotalComponent } from './table/competition-chart-total/competition-chart-total.component';
import { CompetitionTableComponent } from './table/competition-table/competition-table.component';
import { CompetitionInfoComponent } from './table/competition-info/competition-info.component';

@NgModule({
  declarations: [
    CompetitionFormComponent,
    CompetitionParticipantRequestComponent,
    CompetitionInviteComponent,
    CompetitionInvitesComponent,
    CompetitionInviteItemComponent,
    CompetitionLeaderboardComponent,
    CompetitionLeaderboardItemComponent,
    CompetitionParticipantButtonsComponent,
    CompetitionParticipantItemComponent,
    CompetitionParticipantsComponent,
    CompetitionAdminRequestItemComponent,
    CompetitionRequestsComponent,
    CompetitionPageComponent,
    CompetitionListsComponent,
    CompetitionButtonsComponent,
    CompetitionChartComponent,
    CompetitionChartDifferenceComponent,
    CompetitionChartPassFailComponent,
    CompetitionChartTotalComponent,
    CompetitionTableComponent,
    CompetitionInfoComponent,
  ],
  imports: [CommonModule, CompetitionRoutingModule],
})
export class CompetitionModule {}
