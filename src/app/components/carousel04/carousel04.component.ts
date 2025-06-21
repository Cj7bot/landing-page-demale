import {
  Component,
  Inject,
  PLATFORM_ID,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

interface Slide {
  src: string;
  title: string;
}

@Component({
  standalone: true,
  selector: 'app-carousel04',
  templateUrl: './carousel04.component.html',
  imports: [CommonModule],
})
export class Carousel04Component implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('trackRef') trackRef!: ElementRef<HTMLElement>;

  currentSlide = 1;
  allSlides: Slide[] = [];
  private realSlides: Slide[] = [];

  private resizeSubscription?: Subscription;
  private isBrowser: boolean;
  private isAnimating = false;

  private readonly transitionDuration = 700;
  private readonly MOBILE_BREAKPOINT = 768;

  private readonly mobileSlides: Slide[] = [
    { src: 'assets/img/mobile-1.png', title: 'Slide móvil 1' },
    { src: 'assets/img/mobile-2.png', title: 'Slide móvil 2' }
  ];

  private readonly desktopSlides: Slide[] = [
    { src: 'assets/img/brand1.png', title: 'Slide escritorio 1' },
    { src: 'assets/img/brand2.png', title: 'Slide escritorio 2' }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;

    this.setResponsiveSlides();
    this.listenToResize();
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.enableTransition();
    }
  }

  ngOnDestroy(): void {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

  nextSlide(): void {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.currentSlide++;
    this.resetLoopIfNeeded();
  }

  prevSlide(): void {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.currentSlide--;
    this.resetLoopIfNeeded();
  }

  private setResponsiveSlides(): void {
    if (!this.isBrowser) return;

    const isMobile = window.innerWidth < this.MOBILE_BREAKPOINT;
    const baseSlides = isMobile ? this.mobileSlides : this.desktopSlides;

    this.realSlides = baseSlides;

    this.allSlides = [
      baseSlides[baseSlides.length - 1],
      ...baseSlides,
      baseSlides[0],
    ];

    this.currentSlide = 1;
  }

  private listenToResize(): void {
    if (!this.isBrowser) return;

    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(150))
      .subscribe(() => this.setResponsiveSlides());
  }

  private resetLoopIfNeeded(): void {
    setTimeout(() => {
      const total = this.realSlides.length;

      if (this.currentSlide === total + 1) {
        this.disableTransition();
        this.currentSlide = 1;
        setTimeout(() => this.enableTransition(), 50);
      }

      if (this.currentSlide === 0) {
        this.disableTransition();
        this.currentSlide = total;
        setTimeout(() => this.enableTransition(), 50);
      }

      this.isAnimating = false;
    }, this.transitionDuration);
  }

  private disableTransition(): void {
    if (!this.isBrowser || !this.trackRef?.nativeElement) return;
    this.trackRef.nativeElement.style.transition = 'none';
  }

  private enableTransition(): void {
    if (!this.isBrowser || !this.trackRef?.nativeElement) return;
    this.trackRef.nativeElement.style.transition = '';
  }
}
