import {Size} from './size';

export class ProfilePictureDestination{

  public size: Size;
  
  constructor(public name: string, private _width: number, private _height: number){
    this.size = new Size(this. _width, this._height);
  }

}