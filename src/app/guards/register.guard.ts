import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Setting } from '../models/setting';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
  } from 'angularfire2/firestore';

@Injectable()
export class RegisterGuard implements CanActivate {
  settingsCollection: AngularFirestoreCollection<Setting>;
  flag = false;
  constructor(private afs: AngularFirestore, private router: Router) {
    this.settingsCollection = this.afs.collection('settings', ref => ref.where('name', '==', 'allowRegistration'));
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const settings: Observable<Setting[]> = this.settingsCollection.snapshotChanges()
    .map(changes => {
      return changes.map(
        action => {
          const data = action.payload.doc.data() as Setting;
          return data;
        }
      );
    });
     settings.subscribe(result => {
      result.forEach( (value, index) => {
        if (value.name === 'allowRegistration') {
          this.flag = value.value;
          return;
        }
      });
    });
    if (!this.flag) {
      this.router.navigate(['/login']);
    }
    return this.flag;
}
}
