import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PkgListComponent } from "./pkg-list/pkg-list.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PkgListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'poverview';
}
