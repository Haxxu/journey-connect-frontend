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
} from '@ng-icons/material-icons/round';

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
    }),
  ],
  exports: [NgIconsModule],
})
export class IconsModule {}
