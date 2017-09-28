import { Injectable } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2ImgToolsModule } from 'ng2-img-tools';
import {
  ProfilePictureService,
  FileService
} from './';


@NgModule({
  declarations: [
  ],
  exports: [
  ],
  imports: [BrowserModule,
    Ng2ImgToolsModule
  ],
  providers: [
    ProfilePictureService,
    FileService
  ]
})
export class ServicesModule { }