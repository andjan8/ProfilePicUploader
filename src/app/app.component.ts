import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  projectName: string = "this is the project name";
  aboutComponentName: string = "About";
  contactComponentName: string = "Contact";
}
