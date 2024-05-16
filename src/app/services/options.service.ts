import { Injectable } from '@angular/core';
import { WheelOption } from '../components/wheel-option/wheel-option';
import { BehaviorSubject, Subject, take } from 'rxjs';

export const MIN_OPTIONS_NUMBER = 2;
export const MAX_OPTIONS_NUMBER = 10000;

const DEFAULT_COLORS = ['#16ccb6', 'beige'];
const DEFAULT_TEXT_COLORS = ['white', '#16ccb6'];

export class WheelOptionList extends Array<WheelOption> {
  static DEFAULT_NEW_OPTION_TITLE = $localize`:new-option-title:New`;

  static DEFAULT_OPTIONS: WheelOption[] = [
    {
      title: $localize`:first-default-option-label:The Address 15%`,
      backgroundColor: DEFAULT_COLORS[0 % DEFAULT_COLORS.length],
      textColor: DEFAULT_TEXT_COLORS[0 % DEFAULT_TEXT_COLORS.length],
    },
    {
      title: $localize`:second-default-option-label:Mirot Hotel 15%`,
      backgroundColor: DEFAULT_COLORS[1 % DEFAULT_COLORS.length],
      textColor: DEFAULT_TEXT_COLORS[1 % DEFAULT_TEXT_COLORS.length],
    },
    {
      title: $localize`:third-default-option-label:Karim Makka 15%`,
      backgroundColor: DEFAULT_COLORS[2 % DEFAULT_COLORS.length],
      textColor: DEFAULT_TEXT_COLORS[2 % DEFAULT_TEXT_COLORS.length],
    },
    {
      title: $localize`:fourth-default-option-label:The Address 25%`,
      backgroundColor: DEFAULT_COLORS[3 % DEFAULT_COLORS.length],
      textColor: DEFAULT_TEXT_COLORS[3 % DEFAULT_TEXT_COLORS.length],
    },
    {
      title: $localize`:third-default-option-label:Mirot Hotel 25%`,
      backgroundColor: DEFAULT_COLORS[2 % DEFAULT_COLORS.length],
      textColor: DEFAULT_TEXT_COLORS[2 % DEFAULT_TEXT_COLORS.length],
    },
    {
      title: $localize`:fourth-default-option-label:Karim Makka 25%`,
      backgroundColor: DEFAULT_COLORS[3 % DEFAULT_COLORS.length],
      textColor: DEFAULT_TEXT_COLORS[3 % DEFAULT_TEXT_COLORS.length],
    },
    {
      title: $localize`:fourth-default-option-label:The Address Free night`,
      backgroundColor: DEFAULT_COLORS[3 % DEFAULT_COLORS.length],
      textColor: DEFAULT_TEXT_COLORS[3 % DEFAULT_TEXT_COLORS.length],
    },
    {
      title: $localize`:third-default-option-label:Mirot Hotel Free night`,
      backgroundColor: DEFAULT_COLORS[2 % DEFAULT_COLORS.length],
      textColor: DEFAULT_TEXT_COLORS[2 % DEFAULT_TEXT_COLORS.length],
    },
    {
      title: $localize`:fourth-default-option-label:Karim Makka Free night`,
      backgroundColor: DEFAULT_COLORS[3 % DEFAULT_COLORS.length],
      textColor: DEFAULT_TEXT_COLORS[3 % DEFAULT_TEXT_COLORS.length],
    },
  ];

  constructor(...options: WheelOption[]) {
    super();
    this.push(...options);
  }

  public override toString(): string {
    return this.map(option => option.title).join('\n');
  }

  public toNames(): string[] {
    return this.map(option => option.title);
  }
}

@Injectable({
  providedIn: 'root',
})
export class OptionsService {
  static LOCAL_STORAGE_OPTIONS_KEY = 'decision-wheel-angular-options';

  options: Subject<WheelOptionList> = new BehaviorSubject<WheelOptionList>(
    new WheelOptionList(...WheelOptionList.DEFAULT_OPTIONS)
  );
  isTooLow: boolean = false;
  isTooHigh: boolean = false;
  isDisabled: Subject<boolean> = new BehaviorSubject<boolean>(false);
  isAddDisabled: Subject<boolean> = new BehaviorSubject<boolean>(false);
  isRemoveDisabled: Subject<boolean> = new BehaviorSubject<boolean>(false);

  isAdvanced: Subject<boolean> = new BehaviorSubject<boolean>(false);

  isSpinning: Subject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    this.loadFromLocalStorage();

    this.options.subscribe((current: WheelOptionList) => {
      this.isTooLow = current.length < MIN_OPTIONS_NUMBER;
      this.isTooHigh = current.length > MAX_OPTIONS_NUMBER;

      this.isDisabled.next(this.isTooLow || this.isTooHigh);
      this.isAddDisabled.next(current.length >= MAX_OPTIONS_NUMBER);
      this.isRemoveDisabled.next(current.length <= MIN_OPTIONS_NUMBER);

      this.updateLocalStorageCache();
    });
  }

  updateTitles(titles: string[]) {
    const wheelOptions: WheelOption[] = titles
      .filter(title => title.length > 0)
      .filter((title, index) => index < MAX_OPTIONS_NUMBER)
      .map((title, index) => ({
        title,
        backgroundColor: DEFAULT_COLORS[index % DEFAULT_COLORS.length],
        textColor: DEFAULT_TEXT_COLORS[index % DEFAULT_TEXT_COLORS.length],
      }));
    this.options.next(new WheelOptionList(...wheelOptions));
  }

  addOption(optionTitle?: WheelOption['title']): void {
    this.options.pipe(take(1)).subscribe((current: WheelOptionList) => {
      const newOption: WheelOption = {
        title: optionTitle ?? WheelOptionList.DEFAULT_NEW_OPTION_TITLE,
        backgroundColor: DEFAULT_COLORS[current.length % DEFAULT_COLORS.length],
        textColor:
          DEFAULT_TEXT_COLORS[current.length % DEFAULT_TEXT_COLORS.length],
      };
      this.options.next(new WheelOptionList(...current, newOption));
    });
  }

  removeOption(index: number): void {
    this.options.pipe(take(1)).subscribe((current: WheelOptionList) => {
      current.splice(index, 1);
      current.map((option, index) => ({ ...option, index }));
      const newOptions = current.map(option => ({
        ...option,
      }));
      this.options.next(new WheelOptionList(...newOptions));
    });
  }

  renameOption(index: number, title: WheelOption['title']): void {
    this.options.pipe(take(1)).subscribe((current: WheelOptionList) => {
      current[index].title = title;
      this.options.next(current);
    });
  }

  duplicate(index: number) {
    this.options.pipe(take(1)).subscribe((current: WheelOptionList) => {
      if (current.length < MAX_OPTIONS_NUMBER) {
        current.splice(index, 0, { ...current[index] });
        this.options.next(current);
      }
    });
  }

  shuffle() {
    this.options.pipe(take(1)).subscribe((current: WheelOptionList) => {
      let currentIndex = current.length,
        randomIndex;

      while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [current[currentIndex], current[randomIndex]] = [
          current[randomIndex],
          current[currentIndex],
        ];
      }

      this.options.next(current);
    });
  }

  updateBackgroundColor(
    index: number,
    backgroundColor: WheelOption['backgroundColor']
  ) {
    this.options.pipe(take(1)).subscribe(options => {
      if (options[index]) {
        options[index].backgroundColor = backgroundColor;
      }
    });
  }

  startSpin(): void {
    this.isSpinning.next(true);
  }

  endSpin(): void {
    this.isSpinning.next(false);
  }

  private updateLocalStorageCache() {
    this.isAdvanced.subscribe(isAdvanced => {
      this.options.pipe(take(1)).subscribe(options => {
        localStorage.setItem(
          OptionsService.LOCAL_STORAGE_OPTIONS_KEY,
          JSON.stringify({ options, isAdvanced })
        );
      });
    });
  }

  private loadFromLocalStorage() {
    const stringifiedOptions = localStorage.getItem(
      OptionsService.LOCAL_STORAGE_OPTIONS_KEY
    );

    if (stringifiedOptions && stringifiedOptions.length > 0) {
      const { options, isAdvanced } = JSON.parse(stringifiedOptions);
      this.options.next(new WheelOptionList(...options));
      this.isAdvanced.next(isAdvanced);
    }
  }
}
