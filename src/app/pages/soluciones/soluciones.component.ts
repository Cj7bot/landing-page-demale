import { Component } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from '../../components/header/header.component';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-soluciones',
  imports: [HeaderComponent, FooterComponent, RouterLink, RouterOutlet],
  templateUrl: './soluciones.component.html',
  styleUrl: './soluciones.component.css'
})
export class SolucionesComponent {

}
