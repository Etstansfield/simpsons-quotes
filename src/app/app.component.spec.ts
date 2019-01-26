import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { QuotesComponent } from './components/quotes/quotes.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        QuotesComponent
      ],
      imports: [ HttpClientModule ],
      providers: [HttpClient, HttpClientModule]
    }).compileComponents();
  }));

  it('should create the quotes component', () => {
    const fixture = TestBed.createComponent(QuotesComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
