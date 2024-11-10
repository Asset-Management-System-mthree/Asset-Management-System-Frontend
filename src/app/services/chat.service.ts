import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError, map } from 'rxjs';
import { environment } from '../../environments/environment';

interface ChatRequest {
  messages: {
    role: string;
    content: string;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = `${environment.backendUrl}/api/custom-message`;

  constructor(private http: HttpClient) {}

  sendMessage(userMessage: string): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'text/plain, application/json'
    });

    const payload: ChatRequest = {
      messages: [
        {
          role: "system",
          content: "You are HelpBot that helps people find information regarding our asset management site."
        },
        {
          role: "user",
          content: userMessage
        }
      ]
    };

    return this.http.post(this.apiUrl, payload, {
      headers,
      responseType: 'text'  // Tell HttpClient to expect a text response
    }).pipe(
      map(response => {
        // Try to parse as JSON first, if it fails, return as plain text
        try {
          const jsonResponse = JSON.parse(response);
          return typeof jsonResponse === 'string' ? jsonResponse : JSON.stringify(jsonResponse);
        } catch (e) {
          // If parsing fails, return the raw text response
          return response;
        }
      }),
      catchError(error => {
        console.error('Chat API Error:', error);
        return throwError(() => new Error(error.message || 'API error occurred'));
      })
    );
  }
}
