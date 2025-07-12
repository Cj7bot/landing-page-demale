import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaz que representa la respuesta del backend
export interface DocumentLookupResponse {
  success: boolean;
  fullName?: string;        // Nombre completo del ciudadano
  otherInfo?: string;       // Información adicional (ej. apellidos separados)
  errorMessage?: string;    // Mensaje si hubo error en la búsqueda
}

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {
  private readonly apiUrl = 'http://localhost:8081/api/documentos';

  constructor(private http: HttpClient) {}

  /**
   * Consulta el DNI en RENIEC u otra fuente.
   * @param numero - Número de documento (DNI)
   * @returns Observable con la estructura DocumentLookupResponse
   */
  consultarDocumento(numero: string): Observable<DocumentLookupResponse> {
    const url = `${this.apiUrl}/consultar?numero=${numero.trim()}`;
    return this.http.get<DocumentLookupResponse>(url);
  }
}
