import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ExternalImageModalComponent } from '../../externalImageModal/externalImageModal.component';
import { Subscription } from 'rxjs/Subscription';
import {HttpClient} from '@angular/common/http';
import 'rxjs/Rx' ;

@Injectable()
export class FileService {

  bsModalRef: BsModalRef;
  subscriptions: Subscription[] = [];
  constructor(private modalService: BsModalService, private http: HttpClient) { }

  public ShowFileSelectorModal(): Promise<string> {

    let promise = new Promise<string>((resolve, reject) => {
      try {
        this.bsModalRef = this.modalService.show(ExternalImageModalComponent);
        this.subscriptions.push(this.modalService.onHidden.subscribe((reason: string) => {
          let imageUrl = !reason && this.bsModalRef.content.urlSuccessfullyEntered ? this.bsModalRef.content.selectedUrl : "";
          this.unsubscribe();
          resolve(imageUrl);
        }));
      }
      catch (e) {
        resolve("");
        console.log(e)
      };
    });
    return promise;
  }

  public ShowFileSelectorDialog(event: EventTarget): Promise<string> {
    let promise = new Promise<string>((resolve, reject) => {
      try {
        let _eventObj: MSInputMethodContext = <MSInputMethodContext>event;
        let _target: HTMLInputElement = <HTMLInputElement>_eventObj.target;
        let _files: FileList = _target.files;
        let _file: File = _files[0];
        this.renderLocalImageUrl(_file, resolve);
      }
      catch (e) {
        resolve("");
        console.log(e)
      };
    });
    return promise;
  }

  private renderLocalImageUrl(_file: File, resolve: (value: string | PromiseLike<string>) => void) {
    var _self = this;
    let _reader: FileReader = new FileReader();

    _reader.onloadend = function (e) {
      resolve(_reader.result);
    };
    _reader.readAsDataURL(_file);
  }

  private unsubscribe() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

}