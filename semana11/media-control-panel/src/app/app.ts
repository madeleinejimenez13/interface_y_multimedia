import { Component } from '@angular/core';
import { MediaControlPanel } from './media-control-panel/media-control-panel';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MediaControlPanel],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'media-control-panel';
}