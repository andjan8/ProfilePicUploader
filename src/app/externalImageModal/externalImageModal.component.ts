import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { UrlFormModel } from './urlForm.model'

@Component({
  selector: 'external-image-modal-component',
  templateUrl: './externalImageModal.component.html'
})

export class ExternalImageModalComponent implements OnInit {
  
  title = "Paste the url to the image you want to use";
  formInvalidMessage = "You must enter a valid url!";
  urlLabelText = "URL";
  submitButtonText = "Submit";
  urlPlacehoderText = "Paste url here";

  model = new UrlFormModel();
  formInvalid = false;
  selectedUrl = "";
  public urlSuccessfullyEntered = false;
   
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(){
  }

  submitForm(form: any):void {
    this.formInvalid = form.invalid;
    if(!this.formInvalid)
    {
      this.urlSuccessfullyEntered = true;
      this.selectedUrl = this.model.url;
      this.bsModalRef.hide();
    }
  }

}
