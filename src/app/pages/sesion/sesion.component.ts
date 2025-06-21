import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistroService } from '../../services/registro.service';

@Component({
  selector: 'app-sesion',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.css'] // Corrige: debe ser styleUrls
})
export class SesionComponent {
  credenciales = {
    correo: '',
    contrasena: ''
  }

  mostrarPassword: boolean = false;
  mensajeError: string = '';
  mensajeExito: string = '';

  constructor(private registroService: RegistroService, private router: Router) {}

  login() {
    this.mensajeError = '';
    this.mensajeExito = '';

    if (!this.credenciales.correo || !this.credenciales.contrasena) {
      this.mensajeError = 'Por favor completa ambos campos.';
      return;
    }

    this.registroService.login(this.credenciales).subscribe({
      next: (resp: any) => {
        // Si el backend retorna el nombre
        if (resp && resp.nombre) {
          localStorage.setItem('nombreUsuario', resp.nombre);
        } else {
          // Si no, usa el correo como identificador temporal
          localStorage.setItem('nombreUsuario', this.credenciales.correo);
        }
        this.mensajeExito = resp.mensaje || 'Login Exitoso';
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500);
      },
      error: (err) => {
        this.mensajeError = err.error || 'Correo o contraseña incorrectos';
      }
    });
  }
}
