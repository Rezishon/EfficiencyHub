import { Component } from '@angular/core';
import { Hero } from './hero/hero';
import { RouterOutlet } from '@angular/router';
import { OverallStatus } from './overall-status/overall-status';
import { Features } from './features/features';
import { Navbar } from '../../shares/navbar/navbar';

@Component({
  selector: 'app-landing-page',
  imports: [RouterOutlet, Hero, OverallStatus, Features, Navbar],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage {}
