import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Podcast } from '../models/podcast';
import { Like } from '../models/like';

@Injectable({
  providedIn: 'root'
})
export class PodcastsService {

  private endpoint = `${environment.apiUrl}/podcasts`;

  constructor(
    private http: HttpClient
  ) { }

  // Filtra los podcasts
  public filter(q: string = '', fields: string = '', offset: number = 0, limit: number = 20) {
    let headers = new HttpHeaders({});
    if (localStorage.token) {
      headers = new HttpHeaders({
        'Authorization': `Token ${localStorage.token}`
      });
    }

    let params = new HttpParams();
    params = params.append('search', q);
    params = params.append('fields', fields);
    params = params.append('offset', offset.toString());
    params = params.append('limit', limit.toString());

    return this.http.get<any>(`${this.endpoint}/`, {headers: headers, params: params});
  }

  // Obtiene un podcast
  public get(id: number) {
    let headers = new HttpHeaders({});
    if (localStorage.token) {
      headers = new HttpHeaders({
        'Authorization': `Token ${localStorage.token}`
      });
    }
    return this.http.get<Podcast>(`${this.endpoint}/${id}/`, {headers: headers});
  }

  // Da un like
  public like(podcast: Podcast) {
    const headers = new HttpHeaders({
      'Authorization': `Token ${localStorage.token}`
    });
    return this.http.post<Like>(`${this.endpoint}/${podcast.id}/likes/`, {}, {headers: headers});
  }

  // Quita un like
  public unlike(podcast: Podcast) {
    const headers = new HttpHeaders({
      'Authorization': `Token ${localStorage.token}`
    });
    return this.http.delete(`${this.endpoint}/${podcast.id}/likes/`, {headers: headers});
  }

}
