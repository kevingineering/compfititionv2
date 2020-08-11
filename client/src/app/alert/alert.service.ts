import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IAlert } from '../shared/models/alert';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  alertSource = new BehaviorSubject<IAlert>(null);
  alert$ = this.alertSource.asObservable();

  constructor() {}

  setAlert(message: string, persist: boolean = false): void {
    const id = Math.random();
    this.alertSource.next({ id, message, persist });
    console.log(this.alert$);
    setTimeout(() => this.removeAlert(id), 3000);
  }

  clearAlert(): void {
    if (this.alertSource.getValue().persist === false) {
      this.alertSource.next(null);
    }
  }

  private removeAlert(id: number): void {
    if (this.alertSource.getValue().id === id) {
      this.alertSource.next(null);
    }
  }
}
