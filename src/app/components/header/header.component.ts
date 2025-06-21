import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private router = inject(Router);

  menuAbierto = false;
  mostrarSesion = false;
  mostrarMenuUsuario = false;
  menuTimeout: any = null;

  // Verifica si el usuario está logueado (solo en cliente)
  get isLoggedIn(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage?.getItem('nombreUsuario');
  }

  // Obtiene el nombre del usuario (si está disponible)
  get nombreUsuario(): string {
    return typeof window !== 'undefined' ? window.localStorage?.getItem('nombreUsuario') || '' : '';
  }

  // Alterna visibilidad del menú
  toggleMenu() {
    this.mostrarMenuUsuario = !this.mostrarMenuUsuario;
  }

  // Cierra menú con delay (al salir con el mouse)
  iniciarCierreMenu() {
    this.menuTimeout = setTimeout(() => {
      this.mostrarMenuUsuario = false;
    }, 300);
  }

  // Cancela el cierre del menú si el mouse vuelve a entrar
  cancelarCierreMenu() {
    if (this.menuTimeout) {
      clearTimeout(this.menuTimeout);
      this.menuTimeout = null;
    }
  }

  // Cierra el menú directamente (por ejemplo, al hacer clic en una opción)
  cerrarMenu() {
    this.mostrarMenuUsuario = false;
  }

  // Cierra sesión del usuario
  cerrarSesion() {
    if (typeof window !== 'undefined') {
      window.localStorage?.removeItem('nombreUsuario');
      this.router.navigate(['/']); // Redirige al home
    }
  }
}
