import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Podcast } from '../models/podcast';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private endpoint = `${environment.apiUrl}/comments`;

  constructor(
    private http: HttpClient
  ) { }

  public create(comment: Comment) {
    const headers = new HttpHeaders({
      'Authorization': `Token ${localStorage.token}`
    });
    return this.http.post<Comment>(`${this.endpoint}/`, comment, {headers: headers});
  }

  public getAll(podcast: Podcast) {
    let params = new HttpParams();
    params = params.append('podcast', podcast.id.toString() || '');

    return this.http.get<Comment[]>(`${this.endpoint}/`, {params: params});
  }

}
