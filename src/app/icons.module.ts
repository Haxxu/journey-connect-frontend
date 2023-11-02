import { NgModule } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';
import {
  matKeyboardArrowDownRound,
  matCloseRound,
  matImageRound,
  matSearchRound,
  matMoreHorizRound,
  matPerson2Round,
  matLogoutRound,
  matRssFeedRound,
  matPeopleAltRound,
  matBookmarkRound,
  matGroupsRound,
  matPersonAddAlt1Round,
  matPersonRemoveAlt1Round,
  matBlockRound,
  matCheckCircleRound,
  matCancelRound,
  matSendRound,
  matDashboardRound,
  matFeedRound,
  matShareRound,
  matDynamicFeedRound,
  matCommentRound,
  matReportRound,
  matInfoRound,
  matEditRound,
} from '@ng-icons/material-icons/round';

import {
  bootstrapPersonCheckFill,
  bootstrapPersonXFill,
} from '@ng-icons/bootstrap-icons';

@NgModule({
  imports: [
    NgIconsModule.withIcons({
      matKeyboardArrowDownRound,
      matCloseRound,
      matImageRound,
      matSearchRound,
      matMoreHorizRound,
      matPerson2Round,
      matLogoutRound,
      matRssFeedRound,
      matPeopleAltRound,
      matBookmarkRound,
      matGroupsRound,
      matPersonAddAlt1Round,
      matPersonRemoveAlt1Round,
      matBlockRound,
      matCheckCircleRound,
      matCancelRound,
      matSendRound,
      matDashboardRound,
      matFeedRound,
      matShareRound,
      matDynamicFeedRound,
      matCommentRound,
      matReportRound,
      matInfoRound,
      matEditRound,
      bootstrapPersonCheckFill,
      bootstrapPersonXFill,
    }),
  ],
  exports: [NgIconsModule],
})
export class IconsModule {}
