  import { Injectable } from '@angular/core';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { Observable } from 'rxjs';

  // Modelo de datos que se enviará al backend
  export interface RegistroRequest {
    correo: string;
    contrasena: string;
    persona: {
      numeroDocumento: string;
    };
  }

  @Injectable({
    providedIn: 'root'
  })
  export class RegistroService {
    private readonly apiUrl = 'http://localhost:8081/api/registro';

    constructor(private readonly http: HttpClient) {}

    // Registro de usuario
    registrar(data: RegistroRequest): Observable<string> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post(
        this.apiUrl,
        data,
        { headers, responseType: 'text' }
      );
    }


    // Inicio de sesión
    login(credenciales: { correo: string; contrasena: string }): Observable<string> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post<string>(
        `${this.apiUrl}/login`,
        credenciales,
        { headers, responseType: 'text' as 'json' }
      );
    }

    // Obtener datos por correo (si necesitas consultarlos)
    obtenerUsuarioPorCorreo(correo: string): Observable<RegistroRequest> {
      const url = `${this.apiUrl}/correo/${correo}`;
      return this.http.get<RegistroRequest>(url);
    }
  }
