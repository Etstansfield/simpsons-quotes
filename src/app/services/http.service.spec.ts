import { TestBed, async } from '@angular/core/testing';
import { HttpService } from './http.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('HttpService', () => {

  let httpService: HttpService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => TestBed.configureTestingModule({
    providers: [HttpService],
    imports: [HttpClientTestingModule]
  })));

  httpService = TestBed.get(HttpService);
  httpMock = TestBed.get(HttpTestingController);

  it('should be created', () => {
    const service: HttpService = TestBed.get(HttpService);
    expect(service).toBeTruthy();
  });

  it('should successfully get countries and cities', (done) => {
    httpService.get('https://thesimpsonsquoteapi.glitch.me/quotes').subscribe(res => {
      expect(res).toEqual([
        {
         'quote': 'Shoplifting is a victimless crime, like punching someone in the dark.',
         'character': 'Nelson Muntz',
         'image' : 'https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FNelsonMuntz.png?1497567511185',
         'characterDirection' : 'Left'
        }
      ]); done();
    });
    let quoteRequest = httpMock.expectOne('https://thesimpsonsquoteapi.glitch.me/quotes');
    quoteRequest.flush({
      'quote': 'Shoplifting is a victimless crime, like punching someone in the dark.',
      'character': 'Nelson Muntz',
      'image' : 'https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FNelsonMuntz.png?1497567511185',
      'characterDirection' : 'Left'
     });
    httpMock.verify();
  });
});
