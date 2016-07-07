import { Observable, EventData } from 'data/observable';
import { ObservableArray } from 'data/observable-array';
import { BoredRudolph } from "nativescript-bored-rudolph";

export class HelloWorldModel extends Observable {
  public users: any;

  private _isRefreshing: boolean;

  get isRefreshing(): boolean {
    console.log('get isRefreshing: ' + this._isRefreshing);
    return this._isRefreshing;
  }
  set isRefreshing(value: boolean) {
    if (this._isRefreshing !== value) {
      console.log('set isRefreshing: ' + value);
      this._isRefreshing = value;
      this.notifyPropertyChange("isRefreshing", value)
    }
  }


  constructor(rudolph: BoredRudolph) {
    super();
    this.isRefreshing = rudolph.refreshing;

    let usersArray = [
      { name: 'Rudolph' },
      { name: 'Comet' },
      { name: 'Cupid' },
      { name: 'Dancer' },
      { name: 'Comet' },
      { name: 'Prancer' },
      { name: 'Donner' },
      { name: 'Dasher' },
      { name: 'Vixen' },
      { name: 'Rudolph' },
      { name: 'Comet' },
      { name: 'Cupid' },
      { name: 'Dancer' },
      { name: 'Comet' },
      { name: 'Prancer' },
      { name: 'Donner' },
      { name: 'Dasher' },
      { name: 'Vixen' }
    ];

    this.users = new ObservableArray(usersArray);

    this.addEventListener(Observable.propertyChangeEvent, this.refreshChangeHandler, this);

  }

  private refreshChangeHandler(changeObj: any) {
    console.log(changeObj);
  }

  public stopRefresh(args: any) {
    let boredRudolph: BoredRudolph = args.object;
    setTimeout(function () {
      boredRudolph.refreshing = false;
    }, 10000);
  }



}