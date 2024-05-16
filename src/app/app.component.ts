import { Component, Inject, OnInit, SimpleChanges } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WheelComponent } from './components/wheel/wheel.component';
import { CardOptionsListComponent } from './components/card-options-list/card-options-list.component';
import { MuteToggleComponent } from './components/mute-toggle/mute-toggle.component';
import { FullToggleComponent } from './components/full-screen/full-toggle.component';
import { DOCUMENT } from '@angular/common';
import { BreakTextModule } from './pipes/break-text.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    WheelComponent,
    CardOptionsListComponent,
    FullToggleComponent,
    MuteToggleComponent,
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent  {
  title = 'decision-wheel-angular';

  transformedTitle(value: string) {
    // Your logic to break text more than 15 letters
    // This is just a basic example, adjust as per your requirement
    console.log('testtt');
    if (!value) return value;

    let result = '';
    let words = value.split(' ');
    let lineLength = 0;

    for (let word of words) {
      if (lineLength + word.length > 15) {
        result += '\n';
        lineLength = 0;
      }
      result += word + ' ';
      lineLength += word.length + 1; // Account for space after word
    }

    return result.trim();
  }
}
