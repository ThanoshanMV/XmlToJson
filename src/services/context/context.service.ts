import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContextService {
  private xmlContentSource = new Subject<string>();
  xmlContent$ = this.xmlContentSource.asObservable();
  constructor() { }

  sendJsonData(content: string){
    this.xmlContentSource.next(content);
  }
}
