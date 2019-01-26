import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { UrlService } from '../../services/url.service';
import { Quote } from '../../classes/quote';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {

  currentQuote: Quote;

  constructor(
    private httpService: HttpService,
    private urlService: UrlService
  ) { }

  ngOnInit() {
    console.log(this.urlService.getUrl('QUOTE'));

    this.getQuote().subscribe(
      data => {
        console.log(data);
        if (data.quote) {
          this.currentQuote = <Quote>data;
          this.getImage(this.currentQuote.quote).subscribe(
            data2 => {
              console.log(data2);
            }
          )
        }
      }, error => {
        console.error('Got Error: ', error);
      }
    );

  }

  getQuote(): Observable<any> {
    return this.httpService.get(this.urlService.getUrl('Quote')).pipe(
      map(data => {
        return data[0];
      }),
      catchError(
        error => {
          console.error(error);
          return error;
        }
      )
    );
  }

  getImage(imagestring: String): Observable<any> {
    return this.httpService.get(this.urlService.getUrl('IMAGEQUERY') + imagestring).pipe(
      map(data => console.log(data))
    );
  }

}
