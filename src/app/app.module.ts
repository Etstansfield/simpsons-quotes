import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpService } from './services/http.service';
import { UrlService } from './services/url.service';
import { QuotesComponent } from './components/quotes/quotes.component';
import { HttpClient, HttpClientModule  } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    QuotesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [HttpService, UrlService, HttpClient,  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
