import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
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
    Ng2ImgToolsModule,
    HttpClientModule
  ],
  providers: [
    ProfilePictureService,
    FileService
  ]
})
export class ServicesModule { }