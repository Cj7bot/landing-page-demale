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
import { fromEvent, Subscription, interval } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { RouterLink } from '@angular/router';

interface Slide {
  src: string;
  title: string;
  description: string;
}

@Component({
  standalone: true,
  selector: 'app-carousel04',
  templateUrl: './carousel04.component.html',
  imports: [CommonModule, RouterLink],
})
export class Carousel04Component implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('trackRef') trackRef!: ElementRef<HTMLElement>;

  currentSlide = 1;
  allSlides: Slide[] = [];
  realSlides: Slide[] = [];

  private resizeSubscription?: Subscription;
  private autoplaySubscription?: Subscription;
  private isBrowser: boolean;
  private isAnimating = false;

  private readonly transitionDuration = 700;
  private readonly MOBILE_BREAKPOINT = 768;
  private readonly AUTOPLAY_INTERVAL = 5000; // 5 segundos

  private readonly mobileSlides: Slide[] = [
    {
      src: '',
      title: 'CONECTANDO A MÁS PERSONAS Y CIUDADES',
      description: 'Somos Demale, una empresa con más de 20 años en el rubro de envíos de paquetería y clientes satisfechos'
    },
    {
      src: '',
      title: 'LOGÍSTICA Y SERVICIOS 100% DIGITALES',
      description: 'Utilizamos tecnología de punta para garantizar la mejor experiencia en tus envíos'
    }
  ];

  private readonly desktopSlides: Slide[] = [
    {
      src: 'assets/img/car1.png',
      title: 'CONECTANDO A MÁS PERSONAS Y CIUDADES',
      description: 'Somos Demale, una empresa con más de 20 años en el rubro de envíos de paquetería y clientes satisfechos'
    },
    {
      src: 'assets/img/car2.png',
      title: 'LOGÍSTICA Y SERVICIOS 100% DIGITALES',
      description: 'Utilizamos tecnología de punta para garantizar la mejor experiencia en tus envíos'
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;

    this.setResponsiveSlides();
    this.listenToResize();
    this.startAutoplay();
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
    if (this.autoplaySubscription) {
      this.autoplaySubscription.unsubscribe();
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

  goToSlide(index: number): void {
    if (this.isAnimating || this.currentSlide === index + 1) return;
    this.isAnimating = true;
    this.currentSlide = index + 1;
    this.resetLoopIfNeeded();
  }

  private startAutoplay(): void {
    if (!this.isBrowser) return;

    this.autoplaySubscription = interval(this.AUTOPLAY_INTERVAL).subscribe(() => {
      if (!this.isAnimating) {
        this.nextSlide();
      }
    });
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
