import { AlertModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './routing/app-routing.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ExternalImageModalComponent } from './externalImageModal/externalImageModal.component';
import { ProfilePictureService } from './services/profilePictureService/profilePicture.service';
import { ModelModule } from './model/model.module';
import { ServicesModule } from './services/services.module';


@NgModule({
  declarations:
  [AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    ExternalImageModalComponent],
  imports: [
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    ModelModule,
    ServicesModule
  ],
  entryComponents: [
    ExternalImageModalComponent
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
