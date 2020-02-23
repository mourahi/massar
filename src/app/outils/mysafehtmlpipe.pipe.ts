import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safehtml'
})
export class MysafehtmlpipePipe implements PipeTransform {
  constructor(private sanitize: DomSanitizer){}
  transform(value: any): any {
    return this.sanitize.bypassSecurityTrustHtml(value);
  }

}
