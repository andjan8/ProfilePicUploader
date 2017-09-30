import { Component, ViewChild, OnInit, NgZone } from '@angular/core';
import { ProfilePictureService, FileService } from '../services/';
import { ProfilePictureDestination } from '../model/';
import { Size } from '../model/size';
import { SafeUrl } from '@angular/platform-browser';
import { Ng2FileDropAcceptedFile, Ng2FileDropRejectedFile, Ng2FileDropRejections  }  from 'ng2-file-drop';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  @ViewChild('main.fileInput')
  fileInput: any = null;
  @ViewChild("main.fileDownload")
  downloadLink: any = null;
  title: string = "Resize and upload your profile pictures";
  selectLocalImageButtonText: string = "Select file";
  selectExternalImageButtonText: string = "Paste a url";
  imageUrl: SafeUrl = null;
  destinations: ProfilePictureDestination[];
  selectedDestination: ProfilePictureDestination;
  file: File = null;
  private supportedFileTypes: string[] = ['image/png', 'image/jpeg', 'image/gif'];

  constructor(private profilePictureService: ProfilePictureService, private fileService: FileService) { }

  ngOnInit(): void {
    this.destinations = this.profilePictureService.GetDestinations();
  }


  onSelectLocalImageClick(): void {
    this.fileInput.nativeElement.click();
  }


  public onFileInputChange(event: EventTarget): void {
    this.fileService.GetFileFromEvent(event)
      .then((_file) => {
        this.file = _file;
        this.resizeSelectedFile();
    });
  }


  public onSelectExternalImageClick() {
    this.fileService.ShowFileSelectorModal()
      .then((url) => {
        this.fileService.DownloadImageFile(url)
          .then(_file => {
            this.file = _file;
            console.log(_file);
            this.resizeSelectedFile();
          });
      });
  }


  private resizeSelectedFile(): void {
    if(this.file && this.selectedDestination){
      this.fileService.ResizeImage(this.file, this.selectedDestination.size.width, this.selectedDestination.size.height)
      .then((safeUrl) => {
        this.imageUrl = safeUrl;
      })
      .catch((r) => {
        this.imageUrl = null;
        console.log(r);
      });
    }
  }


  public onDestinationSelected(destination: ProfilePictureDestination): void {
    this.selectedDestination = destination;
    this.resizeSelectedFile();
  }


  public onDownloadClick(): void {
    try {
      this.downloadLink.nativeElement.click();
    }
    catch (e) {
      console.log(e);
    }
  }

  
 
  // File being dragged has been dropped and is valid
  private dragFileAccepted(acceptedFile: Ng2FileDropAcceptedFile) {
    console.log("dragFileAccepted");
    this.file = acceptedFile.file;
    this.resizeSelectedFile();
  }
 
}







