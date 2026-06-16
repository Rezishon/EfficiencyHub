import { Component, signal } from '@angular/core';
import {
  LucideArrowUpDown,
  LucideDynamicIcon,
  LucideGlobeCheck,
  LucideIconInput,
  LucideUsers,
} from '@lucide/angular';
import { NgxNumberTickerComponent } from '@omnedia/ngx-number-ticker';

interface StatusData {
  title: string;
  iconName: LucideIconInput;
  value: number;
  postfix?: string;
  description?: string;
}

@Component({
  selector: 'app-overall-status',
  imports: [
    NgxNumberTickerComponent,
    LucideUsers,
    LucideDynamicIcon,
    LucideGlobeCheck,
    LucideArrowUpDown,
  ],
  templateUrl: './overall-status.html',
  styleUrl: './overall-status.css',
})
export class OverallStatus {
  usersValue = '30,000';
  dataTransferPerDayValue = '1024GB';
  upTimeValue = '90%';

  readonly statusData = signal<StatusData[]>([
    { title: 'Users', iconName: LucideUsers, value: 30000, description: 'Since we published' },
    {
      title: 'Bandwidth',
      iconName: LucideArrowUpDown,
      value: 1024,
      postfix: 'GB',
      description: 'average per day',
    },
    {
      title: 'Uptime',
      iconName: LucideGlobeCheck,
      value: 90,
      postfix: '%',
      description: 'On average',
    },
  ]).asReadonly();

  // 2. Expose it to the template as a strict, read-only Signal
}
