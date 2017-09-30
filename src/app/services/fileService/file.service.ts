import { Injectable, NgZone } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ExternalImageModalComponent } from '../../externalImageModal/externalImageModal.component';
import { Subscription } from 'rxjs/Subscription';
import { HttpClient } from '@angular/common/http';
import { Ng2ImgToolsService } from 'ng2-img-tools';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ResponseContentType, RequestOptions } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';

@Injectable()
export class FileService {
  [x: string]: any;
  baseUrl: string = "http://localhost:3000/foreignResources/";
  bsModalRef: BsModalRef;
  subscriptions: Subscription[] = [];
  constructor(private modalService: BsModalService, private ng2ImgToolsService: Ng2ImgToolsService, private sanitizer: DomSanitizer, private zone: NgZone, private httpClient: HttpClient) { }


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


  public DownloadImageFile(_url: string): Promise<File>{
        
    let _fileName: string = this.getFileNameFromUrl(_url);
    let _fileType = this.getFileTypeFromName(_fileName);
    let _options = new RequestOptions({responseType: ResponseContentType.Blob });
    let _headers = new HttpHeaders();
    var _fullUrl = this.baseUrl + "?url="+encodeURIComponent(_url)+"&filetype="+encodeURIComponent(_fileType);
    //_headers.append("Access-Control-Allow-Origin", "http://localhost:4200");
    console.log("Trying to retrieve resource: "+_fullUrl);
    let _promise = new Promise<File>((resolve, reject) => {
      this.httpClient.get(_fullUrl, {observe: "body", responseType: "blob", headers: _headers})
        .subscribe((resp) => {
          try{
            console.log("Retrieved response");
            console.log("Filename: "+_fileName);
            console.log("FileType: "+_fileType);
            console.log(resp);
            let _file: File = new File([resp], _fileName, {type: _fileType} );
            resolve(_file);
          }
          catch(e){
            reject(e);
          }
        });
      });

     
      return _promise;
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


  private getFileNameFromUrl(url: string) : string {
    let parts: string[] = url.split("/");
    let lastPart: string = parts[parts.length-1];
    let fileName: string = lastPart.split(".").length > 1 ? lastPart : lastPart + ".jpg";
    return fileName;
  }

  
  private getFileTypeFromName(name: string) : string {
    let parts = name.split(".");
    let type = "image/"+parts[1].toLowerCase();
    if(type === "image/jpg"){
			type = "image/jpeg";
		}
    return type;
  }

}