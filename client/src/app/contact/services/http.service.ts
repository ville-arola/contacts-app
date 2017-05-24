import {Injectable} from '@angular/core';
import {Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpService extends Http {

  private token: string;
  private storageKey = 'authentication-token';

  constructor (backend: XHRBackend, options: RequestOptions) {
    super(backend, options);
  }

  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    if (typeof url === 'string') { // meaning we have to add the token to the options, not in url
      if (!options) {
        // let's make option object
        options = {headers: new Headers()};
      }
      options.headers.set('Authorization', `Bearer ${this.getToken()}`);
    } else {
      // we have to add the token to the url object
      url.headers.set('Authorization', `Bearer ${this.getToken()}`);
    }
    return super.request(url, options).catch(this.catchAuthError(this));
  }

  private catchAuthError (self: HttpService) {
    return (res: Response) => {
      console.log(res);
      if (res.status === 401 || res.status === 403) {
        console.log(res);
      }
      return Observable.throw(res);
    };
  }

  private getToken() {
    return sessionStorage.getItem(this.storageKey) || this.token;
  }

  public setToken(token: string) {
    sessionStorage.setItem(this.storageKey, token);
    this.token = token;
  }

  public destroyToken() {
    sessionStorage.clear();
    this.token = '';
  }

}
