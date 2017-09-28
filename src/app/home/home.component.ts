import { Component, ViewChild, OnInit, NgZone } from '@angular/core';
import { ProfilePictureService, FileService } from '../services/';
import { ProfilePictureDestination } from '../model/';
import { Size } from '../model/size';
import { SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  title: string = "Resize and upload your profile pictures";
  selectLocalImageButtonText: string = "Select file";
  selectExternalImageButtonText: string = "Paste a url";
  imageSelected: boolean = false;

  @ViewChild('main.fileInput')
  fileInput: any = null;
  imageUrl: string = null;
  destinations: ProfilePictureDestination[];
  selectedDestination: ProfilePictureDestination;

  constructor(private profilePictureService: ProfilePictureService, private fileService: FileService) { }

  ngOnInit(): void {
    this.destinations = this.profilePictureService.GetDestinations();
  }


  onSelectLocalImageClick(): void {
    this.fileInput.nativeElement.click();
  }


  public onSelectExternalImageClick() {
    this.fileService.ShowFileSelectorModal()
      .then((_file) => {
        //this.file = _file;
      });
  }


  public onDownloadClick(): void {
    try {
      var element = document.createElement('a');
      element.setAttribute('href', this.imageUrl);
      element.setAttribute('download', "derpasdf.jpeg");
      element.setAttribute('target', '_blank');
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
    catch (e) {
      console.log(e);
    }
  }


  blepp: SafeUrl = null;
  file: File = null;
  onFileInputChange(event: EventTarget) {
    this.fileService.ShowFileSelectorDialog(event)
      .then((_file) => {
        this.file = _file;
        this.resizeSelectedFile();
    });
  }

  resizeSelectedFile(){
    if(this.file && this.selectedDestination){
      this.fileService.ResizeImage(this.file, this.selectedDestination.size.width, this.selectedDestination.size.height)
      .then((safeUrl) => {
        this.blepp = safeUrl;
      })
      .catch((r) => {
        this.blepp = null;
        console.log(r);
      });
    }
  }


  onDestinationSelected(destination: ProfilePictureDestination): void {
    this.selectedDestination = destination;
    this.resizeSelectedFile();
  }


  setFile(file: string): void {
    throw new Error("Not Implemented!");
  }



}







