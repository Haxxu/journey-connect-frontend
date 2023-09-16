import { NgModule } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';
import {
  matKeyboardArrowDownRound,
  matCloseRound,
} from '@ng-icons/material-icons/round';

@NgModule({
  imports: [
    NgIconsModule.withIcons({ matKeyboardArrowDownRound, matCloseRound }),
  ],
  exports: [NgIconsModule],
})
export class IconsModule {}
