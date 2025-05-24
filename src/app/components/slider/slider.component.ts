import { Component }      from '@angular/core';
import { CommonModule }   from '@angular/common';
import SwiperCore, {
  Navigation, Pagination, Autoplay
} from 'swiper/modules';
import { SwiperModule }   from 'swiper/modules';

SwiperCore.use([Navigation, Pagination, Autoplay]);

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, SwiperModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent {
  imagenes = [
    { src: 'assets/img/slide1.jpg', alt: 'Slide 1' },
    { src: 'assets/img/slide2.jpg', alt: 'Slide 2' },
    { src: 'assets/img/slide3.jpg', alt: 'Slide 3' }
  ];
}
