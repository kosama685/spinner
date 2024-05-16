import { Component, Inject } from '@angular/core';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { WheelSoundsService } from '../../services/wheel-sounds.service';
import { CommonModule, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-fullscreen-toggle',
  standalone: true,
  imports: [MatMiniFabButton, MatIcon, MatTooltip, CommonModule],
  templateUrl: './full-toggle.component.html',
  styleUrl: './full-toggle.component.less',
})
export class FullToggleComponent {
  isMuted: boolean = false;
  elem: any;
  public isFullScreen: boolean = false;
  constructor(@Inject(DOCUMENT) public document: Document) {
    this.isFullScreen = false;
  }


  ngOnInit(): void {
      this.elem = document.documentElement;
  }

  openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();

    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
    this.isFullScreen = true;
  }
/* Close fullscreen */
  closeFullscreen() {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
      this.isFullScreen = false;
    }
  }
}
