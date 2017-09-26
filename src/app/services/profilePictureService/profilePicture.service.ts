import { Injectable } from '@angular/core';
import {ProfilePictureDestination } from '../../model/';

@Injectable()
export class ProfilePictureService{

  public GetDestinations(): ProfilePictureDestination[]{
    return  [
    new ProfilePictureDestination("Facebook", 180,180),
    new ProfilePictureDestination("Twitter", 400, 400),
    new ProfilePictureDestination("Instagram", 110,110),
    new ProfilePictureDestination("LinkedIn", 400, 400)
    ];
  }
}