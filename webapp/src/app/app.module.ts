import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FeaturesModule } from './features/features.module';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { HeaderModule } from './components/header/header.module';
import { FooterModule } from './components/footer/footer.module';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HeaderModule,
    FooterModule,
    FeaturesModule, // Modulo de features de nuestra aplicacion
    AppRoutingModule // Modulo de routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
