import { Injectable } from 'angular2/core';
import { Http, Response, Headers } from 'angular2/http';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/Subject/BehaviorSubject';
import { contentHeaders } from '../../common/index';

@Injectable()
export class AuthService {
  public currentUser: Subject<any>;
  private _http: Http;

  constructor(http: Http) {
    this._http = http;
    this.currentUser = new BehaviorSubject<Response>(null);
  }

  public signin(user: any) {
    let body = this._serialize(user);

    return this._http
    .post('/auth/signin', body, { headers: contentHeaders })
    .map((res: Response) => res.json());
  }

  public register(user: any) {
    let body = this._serialize(user);

    return this._http
    .post('/auth/register', body, { headers: contentHeaders })
    .map((res: Response) => res.json());
  }

  public setCurrentUser(user: any) {
    this.currentUser.next(user);
  }

  private _serialize(data) {
    return JSON.stringify(data);
  }
}
