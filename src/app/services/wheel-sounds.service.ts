import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WheelSoundsService {
  tickSound = new Audio('./assets/tick.mp3');
  tadaSound = new Audio('./assets/tada.mp3');
  playbackRate = 0.55;
  isMuted: Subject<boolean> = new BehaviorSubject(false);

  timeout: ReturnType<typeof setTimeout>;

  private numberOfTicks = 18;
  private increment = 1 / this.numberOfTicks;
  private bezierCalculatedTimes = [...Array(this.numberOfTicks).keys()]
    .map(value => value * this.increment)
    .map(currentTime => {
      return this.bezier(currentTime, 400, 0, 400, 0);
    });

  constructor() {
    this.tickSound.playbackRate = this.playbackRate;

    this.isMuted.subscribe(isMuted => {
      this.tickSound.muted = isMuted;
      this.tadaSound.muted = isMuted;
    });
  }

  /**
   * Starts option wheel ticks' playing with Bezier ease-in-out transition.
   */
  start() {
    let currentIndex = 0;

    this.tickSound.play();

    const loop = () => {
      if (currentIndex < this.bezierCalculatedTimes.length) {
        currentIndex += 1;
        this.tickSound.play();
        this.timeout = setTimeout(
          loop,
          this.bezierCalculatedTimes[currentIndex]
        );
      } else {
        clearTimeout(this.timeout);
        this.tadaSound.play();
      }
    };

    this.timeout = setTimeout(loop, this.bezierCalculatedTimes[currentIndex]);
  }

  mute() {
    this.isMuted.next(true);
  }

  unmute() {
    this.isMuted.next(false);
  }

  /**
   * Creates ease in and out transition
   * @param t current time
   * @param initial initial point
   * @param p1 initial point anchor x-axis coordinate
   * @param p2 final point anchor in x-axis coordinate
   * @param final final point
   * @private
   */
  private bezier(
    t: number,
    initial: number,
    p1: number,
    p2: number,
    final: number
  ) {
    return (
      (1 - t) * (1 - t) * (1 - t) * initial +
      3 * (1 - t) * (1 - t) * t * p1 +
      3 * (1 - t) * t * t * p2 +
      t * t * t * final
    );
  }
}
