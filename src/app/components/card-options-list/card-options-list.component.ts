import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatFormField } from '@angular/material/form-field';
import { MatInput, MatLabel } from '@angular/material/input';
import { CardTextareaComponent } from '../card-textarea/card-textarea.component';
import { Observable, Subscription } from 'rxjs';
import { WheelOption } from '../wheel-option/wheel-option';
import {
  MAX_OPTIONS_NUMBER,
  OptionsService,
} from '../../services/options.service';
import { CommonModule, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { CardOptionAdvancedComponent } from '../advanced-view/card-option-advanced/card-option-advanced.component';
import { CardOptionsAdvancedListComponent } from '../advanced-view/card-options-advanced-list/card-options-advanced-list.component';
import { CardOptionAdvancedAddComponent } from '../advanced-view/card-option-advanced-add/card-option-advanced-add.component';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-card-options-list',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardActions,
    MatButton,
    MatCardSubtitle,
    MatCardContent,
    MatCardFooter,
    MatDivider,
    MatProgressBar,
    MatFormField,
    MatInput,
    MatLabel,
    CardTextareaComponent,
    NgForOf,
    CommonModule,
    FormsModule,
    MatCheckbox,
    CardOptionAdvancedComponent,
    CardOptionsAdvancedListComponent,
    CardOptionAdvancedAddComponent,
    MatIconButton,
    MatIcon,
    MatTooltip,
  ],
  templateUrl: './card-options-list.component.html',
  styleUrl: './card-options-list.component.less',
})
export class CardOptionsListComponent implements OnInit, OnDestroy {

  @Input() IsFullScreen: Boolean;

  options: Observable<WheelOption[]>;

  optionsSubscription: Subscription;
  isAdvancedSubscription: Subscription;

  isAddDisabled: boolean = false;
  isAdvanced: boolean = true;

  constructor(protected optionsService: OptionsService, @Inject(DOCUMENT) public document: Document) {}

  ngOnInit() {
    this.options = this.optionsService.options;

    this.optionsSubscription = this.options.subscribe(options => {
      this.isAddDisabled = options.length >= MAX_OPTIONS_NUMBER;
    });

    this.isAdvancedSubscription = this.optionsService.isAdvanced.subscribe(
      isAdvanced => {
        this.isAdvanced = isAdvanced;
      }
    );
  }

  ngOnDestroy() {
    this.optionsSubscription.unsubscribe();
    this.isAdvancedSubscription.unsubscribe();
  }

  onShuffle() {
    this.optionsService.shuffle();
  }

  onIsAdvancedChange($event: MatCheckboxChange) {
    this.optionsService.isAdvanced.next($event.checked);
  }
  ngOnChanges(): void {

    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

  }
}
