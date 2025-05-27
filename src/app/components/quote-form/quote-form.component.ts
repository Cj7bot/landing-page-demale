import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-quote-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './quote-form.component.html',
})
export class QuoteFormComponent {
  selectedProduct: string = '';

  quote() {
    console.log('Producto seleccionado:', this.selectedProduct);
    // Aquí podrías hacer una llamada a API o mostrar algo
  }
}
