import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { Carousel04Component } from "../../components/carousel04/carousel04.component";
import { WhyComponent } from "../../components/why/why.component";
import { QuoteFormComponent } from "../../components/quote-form/quote-form.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, Carousel04Component, WhyComponent, QuoteFormComponent, FooterComponent, HeaderComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {}
