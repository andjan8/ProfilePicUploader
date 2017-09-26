import { Injectable } from '@angular/core';
import { NgModule } from '@angular/core';
import {ProfilePictureService, 
        FileService} from './';

@NgModule({
  declarations: [ 
     ],
  exports: [
  ],
  providers: [
    ProfilePictureService,
    FileService
  ]
})
export class ServicesModule { }