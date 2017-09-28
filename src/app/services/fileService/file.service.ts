import { Injectable, NgZone } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ExternalImageModalComponent } from '../../externalImageModal/externalImageModal.component';
import { Subscription } from 'rxjs/Subscription';
import { HttpClient } from '@angular/common/http';
import { Ng2ImgToolsService } from 'ng2-img-tools';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import 'rxjs/Rx';

@Injectable()
export class FileService {

  bsModalRef: BsModalRef;
  subscriptions: Subscription[] = [];
  constructor(private modalService: BsModalService, private ng2ImgToolsService: Ng2ImgToolsService, private sanitizer: DomSanitizer, private zone: NgZone) { }


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


  public ShowFileSelectorDialog(event: EventTarget): Promise<File> {
    let promise = new Promise<File>((resolve, reject) => {
      try {
        let _eventObj: MSInputMethodContext = <MSInputMethodContext>event;
        let _target: HTMLInputElement = <HTMLInputElement>_eventObj.target;
        let _files: FileList = _target.files;
        let _file: File = _files[0];
        resolve(_file);
        //this.renderLocalImageUrl(_file, resolve);
      }
      catch (e) {
        resolve(null);
        console.log(e)
      };
    });
    return promise;
  }


  public ResizeImage(file: File, width: number, height: number): Promise<SafeUrl> {
    let promise = new Promise<SafeUrl>((resolve, reject) => {
      try {
        this.ng2ImgToolsService.resizeExactCrop([file], width, height).subscribe(result => {
          console.log("Resize exact crop result:", result);
          //all good
          this.zone.run(() => {
            let resizedExactCroppedImage = window.URL.createObjectURL(result);
            let safeUrl = this.sanitizer.bypassSecurityTrustUrl(resizedExactCroppedImage);
            console.log(safeUrl);
            resolve(safeUrl)
          });
        }, error => {
          throw error;
        });
      }
      catch (e) {
        reject("Could not resize image. " + e);
      }
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