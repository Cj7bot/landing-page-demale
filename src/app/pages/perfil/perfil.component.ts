import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RegistroService, Usuario } from '../../services/registro.service';
import { HttpClientModule } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuario: Usuario | null = null;
  enviosRecientes = [
    { id: 'ENV12345', destino: 'Lima, Perú', estado: 'Entregado', fecha: '2025-06-15' },
    { id: 'ENV12346', destino: 'Arequipa, Perú', estado: 'En tránsito', fecha: '2025-06-18' },
    { id: 'ENV12347', destino: 'Cusco, Perú', estado: 'Pendiente', fecha: '2025-06-20' }
  ];

  private registroService = inject(RegistroService);
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const correo = localStorage.getItem('nombreUsuario');
      if (correo) {
        this.registroService.obtenerUsuarioPorCorreo(correo).subscribe({
          next: (usuario) => {
            this.usuario = Array.isArray(usuario) ? usuario[0] : usuario;
          },
          error: (error) => {
            console.error('Error al obtener usuario:', error);
          }
        });
      }
    }
  }

  editarPerfil() {
    console.log('Editar perfil');
  }

  cambiarContrasena() {
    console.log('Cambiar contraseña');
  }
}
