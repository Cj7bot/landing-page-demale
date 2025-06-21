import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  nombre: string;
  correo: string;
  contrasena: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private readonly apiUrl = 'http://localhost:8081/api/registro';

  constructor(private readonly http: HttpClient) {}

  registrar(usuario: Usuario): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<string>(this.apiUrl, usuario, {
      headers,
      responseType: 'text' as 'json'
    });
  }

  login(credenciales: { correo: string; contrasena: string }): Observable<string> {
  const headers = { 'Content-Type': 'application/json' };
  return this.http.post<string>(
    'http://localhost:8081/api/registro/login',
    credenciales,
    { headers, responseType: 'text' as 'json' }
  );
  }
  obtenerUsuarioPorCorreo(correo: string): Observable<Usuario> {
    const url = `${this.apiUrl}/correo/${correo}`;
    return this.http.get<Usuario>(url);
  }

}
