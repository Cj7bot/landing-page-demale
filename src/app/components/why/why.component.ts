import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ necesario para *ngFor y directivas comunes
import { RouterModule } from '@angular/router'; // ✅ necesario para routerLink

@Component({
  selector: 'app-why',
  standalone: true,
  imports: [CommonModule, RouterModule], // ✅ ← aquí va
  templateUrl: './why.component.html',
  styleUrls: ['./why.component.css'],
})
export class WhyComponent {
  cards = [
    {
      src: 'assets/img/logo1.png',
      alt: 'Logística digital',
      title: 'LOGÍSTICA Y SERVICIOS 100% DIGITALES',
      link: '/servicios-digitales',
    },
    {
      src: 'assets/img/logo2.png',
      alt: 'Siempre a tiempo',
      title: '¡SIEMPRE A TIEMPO!',
      link: '/puntualidad',
    },
  ];
}
