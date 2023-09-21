import { NgModule } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';
import {
  matKeyboardArrowDownRound,
  matCloseRound,
  matImageRound,
  matSearchRound,
  matMoreHorizRound,
} from '@ng-icons/material-icons/round';

@NgModule({
  imports: [
    NgIconsModule.withIcons({
      matKeyboardArrowDownRound,
      matCloseRound,
      matImageRound,
      matSearchRound,
      matMoreHorizRound,
    }),
  ],
  exports: [NgIconsModule],
})
export class IconsModule {}
