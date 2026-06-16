import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  titleText = 'Email infrastructure';
  headerText = 'Built for speed and scale.';
  bodyText =
    'Stop landing in spam. Deploy a secure,lightning-fast mail transfer agent with 90.0% deliverability guaranteed out of the box.';
}
