import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { QuotesComponent } from './quotes.component';

describe('QuotesComponent', () => {
  let component: QuotesComponent;
  let fixture: ComponentFixture<QuotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotesComponent ],
      providers: [HttpClient, HttpClientModule],
      imports: [ HttpClientModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate an image string', () => {
    // https://frinkiac.com/img/S05E17/561260/large.jpg
    const imageObj = {
      Episode: 'S05E17',
      Timestamp: 561260,
      Id: 0
    };

    expect(component.createImageStrings([imageObj])).toEqual(['https://frinkiac.com/img/S05E17/561260/large.jpg']);

  })
});
