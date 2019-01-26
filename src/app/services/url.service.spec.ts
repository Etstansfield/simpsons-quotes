import { TestBed } from '@angular/core/testing';

import { UrlService } from './url.service';

describe('UrlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UrlService = TestBed.get(UrlService);
    expect(service).toBeTruthy();
  });

  it('should get specified url: https://thesimpsonsquoteapi.glitch.me/quotes', () => {
    const service: UrlService = TestBed.get(UrlService);
    expect(service.getUrl('Quote')).toBe('https://thesimpsonsquoteapi.glitch.me/quotes');
  });

  it('should fail to get unknown url from key: TEST', () => {
    const service: UrlService = TestBed.get(UrlService);
    expect(service.getUrl('TEST')).toBe(undefined);
  });
});
