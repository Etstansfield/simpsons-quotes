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
    console.log(this.urlService.getUrl('LOCALMACHINEQUOTE'));
    // this.getNewQuoteAndImage();
    this.getQuoteAndImage();
  }

  /*****************************************************************************************
   * NEW Code using new Nest.js backend to get around frinkiac's CORS                      *
   ****************************************************************************************/

   /**
    * @description - get a quote and image from the nest js localhost server (3000)
    */
  getQuoteAndImage(): void {

    this.getData().subscribe(
      data => {
        console.log(data);
        this.currentQuote = data.Quote;
        this.currentImageSrc = this.createImageString(data.Image);

      },
      error => {
        console.error('+++ An Error has occured: ', error, ' +++');
      }
    );

  }

  /**
   * @description - perform the http call to get the image and quote
   */
  getData(): Observable<any> {
    return this.httpService.get(this.urlService.getUrl('LOCALMACHINEQUOTE')).pipe(
      map(data => {
        return data;
      }),
      catchError(
        error => {
          console.error(error);
          return error;
        }
      )
    );
  }

  /*****************************************************************************************
   * END OF NEW CODE                                                                       *
   *****************************************************************************************/
  /**
   * @description - get a new quote and image
   * ! - OBSOLETE
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
            // const images = this.createImageStrings(data2);
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
   * ! - OBSOLETE
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
   * ! - OBSOLETE
   */
  getImage(imagestring: String): Observable<any> {
    return this.httpService.get(this.urlService.getUrl('IMAGEQUERY') + imagestring).pipe(
      map(data => data)
    );
  }

  /**
   * @description - create the img src strings used to generate the image
   * @param result - the results from the frinkiac search
   */
  createImageString(result: Image): String {
    // frikiac image strings are /img/ep/timestamp/size.jpg e.g.
    // https://frinkiac.com/img/S05E17/561260/large.jpg

    // const imageStrings = [];

    // results.forEach(element => {
      const imageString = 'https://frinkiac.com/img/' + result.Episode + '/' + String(result.Timestamp) + '/large.jpg';
      // imageStrings.push(imageString);
    // });

    return imageString;
  }

}
