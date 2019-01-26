import { Injectable } from '@angular/core';

const URLS = {
  'QUOTE': 'https://thesimpsonsquoteapi.glitch.me/quotes',
  'IMAGEQUERY': 'https://frinkiac.com/api/search?q='
};

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor() { }

  /**
   * @description - get a url from the constant
   * @param key - the object key
   */
  getUrl(key: string): string {
    return URLS[key.toUpperCase()];
  }
}
