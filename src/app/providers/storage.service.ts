import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  //public _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    //if(!this._storage)
    //  this._storage = await this.storage.create();
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    console.log(key, value);
    //return this._storage?.set(key, value);

    return Preferences.set({
      key: key,
      value: value,
    });
  }

  public remove(key: string) {
    console.log(key);
    //return this._storage?.remove(key);

    return Preferences.remove({ key: key});
  }

  public get(key: string) {
    console.log(key);
    //return this._storage.get(key);

    return Preferences.get({ key: key });
  }

  public clear() {
    return Preferences.clear();
    //this._storage?.clear();
  }
}