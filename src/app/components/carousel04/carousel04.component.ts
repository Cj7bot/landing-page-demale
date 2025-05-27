import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-carousel04',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './carousel04.component.html',
})
export class Carousel04Component {
  slides = [
    { src: 'assets/img/brand1.1.png', title: 'Slide 1' },
    { src: 'assets/img/brand2.png', title: 'Slide 2' }
  ];
  currentSlide = 0;

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }
}
