import { Component } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-envio',
  imports: [FooterComponent, HeaderComponent, RouterOutlet],
  templateUrl: './envio.component.html',
  styleUrl: './envio.component.css'
})
export class EnvioComponent {

}
