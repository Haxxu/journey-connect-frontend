import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[scrollTracker]',
  standalone: true,
})
export class ScrollTrackerDirective {
  @Output() scrollingFinished = new EventEmitter<void>();

  emitted = false;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !this.emitted
    ) {
      this.emitted = true;
      this.scrollingFinished.emit();
    } else if (
      window.innerHeight + window.scrollY <
      document.body.offsetHeight
    ) {
      this.emitted = false;
    }
  }
}
