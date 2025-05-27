import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import{ RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-rastreo',
  standalone: true,
  imports: [CommonModule, FormsModule, FooterComponent, HeaderComponent, RouterOutlet],
  templateUrl: './rastreo.component.html',
  styleUrl: './rastreo.component.css'
})
export class RastreoComponent {
  trackingNumber = '';
  year = '';

  buscarEnvio(){
    console.log('Buscando tracking:', this.trackingNumber, 'Año:', this.year);
  }
}
