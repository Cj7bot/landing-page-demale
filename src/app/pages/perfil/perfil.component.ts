import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  correo: string | null = null;

  enviosRecientes = [
    { id: 'ENV12345', destino: 'Lima, Perú', estado: 'Entregado', fecha: '2025-06-15' },
    { id: 'ENV12346', destino: 'Arequipa, Perú', estado: 'En tránsito', fecha: '2025-06-18' },
    { id: 'ENV12347', destino: 'Cusco, Perú', estado: 'Pendiente', fecha: '2025-06-20' }
  ];

  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.correo = localStorage.getItem('nombreUsuario');
    }
  }

  editarPerfil() {
    console.log('Editar perfil');
  }

  cambiarContrasena() {
    console.log('Cambiar contraseña');
  }
}
