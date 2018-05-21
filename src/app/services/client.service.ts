import { Injectable } from '@angular/core';
import {
        AngularFirestore,
        AngularFirestoreCollection,
        AngularFirestoreDocument
        } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Client } from '../models/client';

@Injectable()
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;

  constructor(private afs: AngularFirestore) {
    this.clientsCollection = this.afs.collection('clients',
  ref => ref.orderBy('lastName', 'asc'));
  }

  getClients = (): Observable<Client[]> => {
   this.clients = this.clientsCollection.snapshotChanges()
    .map(changes => {
      return changes.map(
        action => {
          const data = action.payload.doc.data() as Client;
          data.id = action.payload.doc.id;
          return data;
        }
      );
    });
    return this.clients;
  }

  addClient = (value: Client) => {
    this.clientsCollection.add(value);
  }
}
