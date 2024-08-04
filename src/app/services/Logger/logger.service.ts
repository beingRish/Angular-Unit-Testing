import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  message: string[] = [];

  constructor() {
    debugger;
    // logic
  }

  log(message: string) {
    this.message.push(message);
  }
}
