import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import  {HeaderComponent} from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pass',
  imports: [CommonModule, FormsModule, RouterLink, HeaderComponent],
  templateUrl: './pass.component.html',
  styleUrl: './pass.component.css'
})
export class PassComponent {

}
