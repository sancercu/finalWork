import { Component, OnInit } from '@angular/core';
import { Podcast } from '../../models/podcast';
import { PodcastsService } from '../../services/podcasts.service';
import {debounceTime, distinctUntilChanged} from 'rxjs/internal/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-podcasts-list',
  templateUrl: './podcasts-list.component.html',
  styleUrls: ['./podcasts-list.component.scss']
})
export class PodcastsListComponent implements OnInit {

  public podcasts: Podcast[] = [];
  public q = '';
  public loading = true;

  private thereAreMore = true;
  private offset = 0;
  private limit = 20;
  // Indica los campos que queremos que la API nos devuelva por cada podcast cuando los listamos
  private fields = 'id,created,title,album,author,description,cover,song,likes_amount,likeme,year,youtube_url';
  // Observable para controlar el cambio del valor del texto de busqueda para filtrar podcasts
  private searchQueryChanged: Subject<string> = new Subject<string>();

  constructor(
    private podcastsService: PodcastsService
  ) {
    /* Esperamos 1 segundo hasta que el usuario termine de ingresar el texto de busqueda
    y si el valor nuevo es distinto del valor anterior, ejecuta el callback pasado a la funcion "subscribe" */
    this.searchQueryChanged
    .pipe(debounceTime(1000), distinctUntilChanged())
    .subscribe(() => {
      // Reseteamos los valores de paginacion
      this.reset();
      // Dispara el requerimiento a la API con la paginacion reseteada
      this.filter();
     });
  }

  ngOnInit() {
    this.filter();
  }

  // Funcion que se ejecuta cada vez que el usuario presiona una tecla sobre el input de busqueda
  public search(value: string) {
    this.q = value;
    // Le avisa al observador que hay un nuevo texto en el input de busqueda
    this.searchQueryChanged.next(value);
  }

  public filter() {
    // Oculata el spinner
    this.loading = true;
    // Hace el requerimiento a la API
    this.podcastsService.filter(this.q, this.fields, this.offset, this.limit)
    .subscribe(
      (data: any) => {
        // Agrega la nueva pagina de podcasts al listado que tenemos renderizado en el componente
        this.podcasts = this.podcasts.concat(data.results);
        // Verifica si hay mas datos para traer de la API
        this.thereAreMore = data.results.length === this.limit;
        // Actualiza el indice de paginacion (pasamos a la siguiente pagina)
        this.offset += this.limit;
        // Oculta el spinner
        this.loading = false;
      }
    );
  }

  public onScroll() {
    // Verifica si es necesario perdir mas datos a la API
    if (!this.thereAreMore) {
    return;
    }
    this.filter();
  }

  private reset() {
    this.podcasts = [];
    this.offset = 0;
  }

}
