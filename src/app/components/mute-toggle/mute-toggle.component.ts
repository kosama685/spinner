import { Component } from '@angular/core';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { WheelSoundsService } from '../../services/wheel-sounds.service';

@Component({
  selector: 'app-mute-toggle',
  standalone: true,
  imports: [MatMiniFabButton, MatIcon, MatTooltip],
  templateUrl: './mute-toggle.component.html',
  styleUrl: './mute-toggle.component.less',
})
export class MuteToggleComponent {
  isMuted: boolean = false;

  constructor(private wheelSoundsService: WheelSoundsService) {}

  onMuteToggle() {
    this.isMuted = !this.isMuted;

    if (this.isMuted) {
      this.wheelSoundsService.mute();
    } else {
      this.wheelSoundsService.unmute();
    }
  }
}
