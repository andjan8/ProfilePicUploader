import { Injectable } from '@angular/core';
import { NgModule } from '@angular/core';
import {ProfilePictureService, 
        FileService} from './';
import {HttpClientModule} from '@angular/common/http';
@NgModule({
  declarations: [ 
     ],
  exports: [
  ],
  imports: [HttpClientModule],
  providers: [
    ProfilePictureService,
    FileService
  ]
})
export class ServicesModule { }