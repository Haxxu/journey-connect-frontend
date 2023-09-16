import { NgModule } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';
import { matKeyboardArrowDownRound } from '@ng-icons/material-icons/round';

@NgModule({
  imports: [NgIconsModule.withIcons({ matKeyboardArrowDownRound })],
  exports: [NgIconsModule],
})
export class IconsModule {}
