import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegistroService } from '../../services/registro.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  usuario = {
    nombre: '',
    correo: '',
    contrasena: '',
    repetirContrasena: ''
  };

  mostrarPassword: boolean = false;
  mostrarConfirmar: boolean = false;
  mensajeError: string = '';

  constructor(private registroService: RegistroService) {}

  registrar() {
    this.mensajeError = '';

    // Validar campos vacíos o solo espacios
    if (
      !this.usuario.nombre.trim() ||
      !this.usuario.correo.trim() ||
      !this.usuario.contrasena.trim() ||
      !this.usuario.repetirContrasena.trim()
    ) {
      this.mensajeError = 'Por favor completa todos los campos.';
      return;
    }

    // Validar que las contraseñas coincidan
    if (this.usuario.contrasena !== this.usuario.repetirContrasena) {
      this.mensajeError = 'Las contraseñas no coinciden';
      return;
    }

    const data = {
      nombre: this.usuario.nombre,
      correo: this.usuario.correo,
      contrasena: this.usuario.contrasena
    };

    this.registroService.registrar(data).subscribe({
      next: (msg) => alert(msg),
      error: () => this.mensajeError = 'Error al registrar'
    });
  }
}
