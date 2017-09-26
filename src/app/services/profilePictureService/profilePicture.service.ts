import { Injectable } from '@angular/core';
import {ProfilePictureDestination } from '../../model/';

@Injectable()
export class ProfilePictureService{

  public GetDestinations(): ProfilePictureDestination[]{
    return  [
    new ProfilePictureDestination("Facebook", 'fa-facebook', 180,180),
    new ProfilePictureDestination("Twitter", 'fa-twitter', 400, 400),
    new ProfilePictureDestination("Instagram", 'fa-instagram', 110,110),
    new ProfilePictureDestination("LinkedIn", 'fa-linkedin', 400, 400)
    ];
  }
}
