import { Injectable } from '@angular/core';
import { Setting } from '../models/setting';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
  } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SettingsService {
  settings: Observable<Setting[]>;
  settingsCollection: AngularFirestoreCollection<Setting>;

  constructor(private afs: AngularFirestore) {
    this.settingsCollection = this.afs.collection('settings');
  }

  getSettings = (): Observable<Setting[]> => {
   this.settings = this.settingsCollection.snapshotChanges()
    .map(changes => {
      return changes.map(
        action => {
          const data = action.payload.doc.data() as Setting;
          data.id = action.payload.doc.id;
          return data;
        }
      );
    });
    return this.settings;
  }

  updateSetting = (value: Setting) => {
    this.afs.doc<Setting>(`settings/${value.id}`).update(value);
  }

}
