import { Component, ViewChild, OnInit } from '@angular/core';
import { ProfilePictureService, FileService } from '../services/';
import { ProfilePictureDestination } from '../model/';
import { Size } from '../model/size';


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

  constructor(private profilePictureService: ProfilePictureService,
    private fileService: FileService) { }

  ngOnInit(): void {
    this.destinations = this.profilePictureService.GetDestinations();
  }

  onSelectLocalImageClick(): void {
    this.fileInput.nativeElement.click();
  }

  public onSelectExternalImageClick() {
    this.fileService.ShowFileSelectorModal()
      .then((file) => this.setFile(file));
  }

  public onDownloadClick(): void{
   try{
      var element = document.createElement('a');
      element.setAttribute('href',this.imageUrl);
      element.setAttribute('download', "derpasdf.jpeg");
      element.setAttribute('target', '_blank');
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
    catch(e){
      console.log(e);
    }
  }


  onFileInputChange(event: EventTarget) {
    this.fileService.ShowFileSelectorDialog(event)
      .then((file) => this.setFile(file));
  }

  setFile(file: string): void {
    this.imageUrl = file;
    this.imageSelected = file !== "";
  }

  onDestinationSelected(destination: ProfilePictureDestination): void {
    this.selectedDestination = destination;
  }
}







