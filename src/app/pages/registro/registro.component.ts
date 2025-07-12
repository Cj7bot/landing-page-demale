import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RegistroService } from '../../services/registro.service';
import { DocumentoService } from '../../services/documento.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  usuario = {
    numeroDocumento: '',
    nombre: '',
    apellidos: '',
    correo: '',
    contrasena: '',
    repetirContrasena: '',
    idTipoDoc: 1
  };

  mostrarPassword  = false;
  mostrarConfirmar = false;
  mensajeError     = '';
  mensajeDni       = '';

  constructor(
    private registroService: RegistroService,
    private documentoService: DocumentoService
  ) {}

  buscarPersonaPorDni() {
    this.mensajeDni = '';
    const dni = this.usuario.numeroDocumento.trim();

    if (dni.length !== 8) {
      if (dni.length > 0) {
        this.mensajeDni = 'El DNI debe tener 8 dígitos.';
        this.usuario.nombre    = '';
        this.usuario.apellidos = '';
      }
      return;
    }

    this.documentoService.consultarDocumento(dni)
      .subscribe({
        next: resp => {
          if (!resp.success) {
            this.usuario.nombre    = '';
            this.usuario.apellidos = '';
            this.mensajeDni = resp.errorMessage || 'No hay datos para ese DNI.';
            return;
          }

          const info = resp.otherInfo || '';
          const paternoMatch = info.match(/Apellido Paterno:\s*([^,;]+)/i);
          const maternoMatch = info.match(/Apellido Materno:\s*([^,;]+)/i);
          const paterno = paternoMatch ? paternoMatch[1].trim() : '';
          const materno = maternoMatch ? maternoMatch[1].trim() : '';

          const full  = resp.fullName || '';
          const words = full
            .split(' ')
            .filter(w =>
              w.toUpperCase() !== paterno.toUpperCase() &&
              w.toUpperCase() !== materno.toUpperCase()
            );

          this.usuario.nombre    = words.join(' ');
          this.usuario.apellidos = [paterno, materno].filter(Boolean).join(' ');
        },
        error: (err) => {
          console.error('✖ Error backend:', err);
          this.mensajeError = err?.error || 'Error al consultar el DNI.';
        }
      });
  }

  registrar() {
    this.mensajeError = '';

    if (
      !this.usuario.numeroDocumento.trim() ||
      !this.usuario.correo.trim() ||
      !this.usuario.contrasena.trim() ||
      !this.usuario.repetirContrasena.trim()
    ) {
      this.mensajeError = 'Por favor completa todos los campos.';
      return;
    }

    if (this.usuario.numeroDocumento.length !== 8) {
      this.mensajeError = 'El DNI debe tener 8 dígitos.';
      return;
    }

    if (this.usuario.contrasena !== this.usuario.repetirContrasena) {
      this.mensajeError = 'Las contraseñas no coinciden.';
      return;
    }

    const payload = {
      numeroDocumento: this.usuario.numeroDocumento,
      correo: this.usuario.correo,
      contrasena: this.usuario.contrasena,
      tipoDocumento: {
        idTipoDoc: this.usuario.idTipoDoc  // ✅ objeto, no valor plano
      }
    };


    this.registroService.registrar(payload).subscribe({
      next: () => alert('¡Registro exitoso!'),
      error: (err) => {
        console.error('✖ Error backend:', err);
        this.mensajeError = err?.error || 'Error inesperado al registrar.';
      }
    });
  }
}
