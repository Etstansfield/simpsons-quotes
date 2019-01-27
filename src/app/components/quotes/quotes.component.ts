import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { UrlService } from '../../services/url.service';
import { Quote } from '../../classes/quote';
import { Image } from '../../classes/image';
import { mergeMap, map, catchError , switchMap} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {

  currentQuote: Quote;
  currentImageSrc: String;

  constructor(
    private httpService: HttpService,
    private urlService: UrlService
  ) { }

  ngOnInit() {
    console.log(this.urlService.getUrl('QUOTE'));
    this.getNewQuoteAndImage();
  }

  /**
   * @description - get a new quote and image
   */
  getNewQuoteAndImage(): void {
    this.getQuote().pipe(
      map(
        data => this.currentQuote = data
      )
    ).subscribe(
      data => {
        this.getImage(this.currentQuote.quote).subscribe(
          data2 => {
            console.log('+++ Image Data: ', data2, ' +++');
            const images = this.createImageStrings(data2);
            if (images.length >= 1) {
              this.currentImageSrc = images[0];
            }

          },
          error => {
            console.error('+++ Error Retrieving Images: ', error , '+++');
          }
        );
      }
    );
  }

  /**
   * @description - get a random quote from the simpsons api
   */
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

  /**
   * @description - search frinkiac for images related to the quote
   * @param imagestring - the quote to search for
   */
  getImage(imagestring: String): Observable<any> {
    return this.httpService.get(this.urlService.getUrl('IMAGEQUERY') + imagestring).pipe(
      map(data => data)
    );
  }

  /**
   * @description - create the img src strings used to generate the image
   * @param results - the results from the frinkiac search
   */
  createImageStrings(results: Image[]): String[] {
    // frikiac image strings are /img/ep/timestamp/size.jpg e.g.
    // https://frinkiac.com/img/S05E17/561260/large.jpg

    const imageStrings = [];

    results.forEach(element => {
      const imageString = 'https://frinkiac.com/img/' + element.Episode + '/' + String(element.Timestamp) + '/large.jpg';
      imageStrings.push(imageString);
    });

    return imageStrings;
  }

}
