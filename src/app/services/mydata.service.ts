import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MydataService {

  constructor(private http: HttpClient) {}

  private getMyURL(n: number){ // number de la page
    return 'https://spreadsheets.google.com/feeds/list/1sE2n1re7IObh7RPxVG40erkD5VhV2DDnUlyCCdQXsos/' + n + '/public/values?alt=json';
  }

  getMyData(): Observable<any> {

    const subject = new Subject<string>();
    this.http.get(this.getMyURL(1)).subscribe(x => {
         subject.next(this.preparemyjson(x));
      });
    return subject.asObservable();
  }
  getMyStructure(): Observable<any> {
    const subject = new Subject<string>();
    this.http.get(this.getMyURL(2)).subscribe(x => {
         subject.next(this.preparemyjson(x));
      });
    return subject.asObservable();
  }
  getMyDeparts(): Observable<any>  {
    const subject = new Subject<string>();
    this.http.get(this.getMyURL(3)).subscribe(x => {
         subject.next(this.preparemyjson(x));
      });
    return subject.asObservable();
  }
  getMySortie(): Observable<any>  {
    const subject = new Subject<string>();
    this.http.get(this.getMyURL(4)).subscribe(x => {
         subject.next(this.preparemyjson(x));
      });
    return subject.asObservable();
  }
  getMyScolarite(): Observable<any>  {
    const subject = new Subject<string>();
    this.http.get(this.getMyURL(5)).subscribe(x => {
         subject.next(this.preparemyjson(x));
      });
    return subject.asObservable();
  }
  private preparemyjson(d): any {
      let titenamesarray = new Array();
      let titlenames = {};
      const mydata = new Array();
      let o = new Object();
      let iii = true;
      const data = d.feed.entry;
      data.forEach(element => {
        const v = (element.content.$t as string).split(',');
        if (iii) {
        o = {};
        let ia = 0;
        v.forEach(el => {
          const k = el.split(':');
          iii = false;
          o[k[0].trim()] =k[1].trim();
          ia += 1;
        });
        titlenames = o;
        titenamesarray = Object.keys(o);
      } else {
        const oo = {};
        let i = 0;
        v.forEach(el => {
          const kk = el.split(':');
          oo[titlenames[kk[0].trim()]] =  kk[1] == undefined ? '' :  kk[1].trim();
          i += 1;
        });
        titenamesarray.forEach( f => {
          if (!(titlenames[f] in oo)) { oo[titlenames[f]] = ''; }
        });
        mydata.push(oo);
      }
      });
      return mydata;
   }
}

