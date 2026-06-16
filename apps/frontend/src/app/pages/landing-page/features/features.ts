import { Component, signal } from '@angular/core';
import {
  LucideChartSpline,
  LucideDynamicIcon,
  LucideGlobeLock,
  LucideIconInput,
  LucideSend,
  LucideSprout,
} from '@lucide/angular';
import { Footer } from '../../../shares/footer/footer';

interface featuresData {
  title: string;
  iconName: LucideIconInput;
  description: string;
}

@Component({
  selector: 'app-features',
  imports: [LucideDynamicIcon, LucideSprout, Footer],
  templateUrl: './features.html',
  styleUrl: './features.css',
})
export class Features {
  readonly featuresData = signal<featuresData[]>([
    {
      title: 'Automated SPF/DKIM/DMARC',
      iconName: LucideGlobeLock,
      description:
        'No more DNS headaches. We automatically generate and verify your authentication records for maximum inbox placement.',
    },
    {
      title: 'SMTP & Mail API',
      iconName: LucideSend,
      description:
        'Integrate natively via SMTP relay or use our robust REST API. Works seamlessly with standard CLI tools and servers.',
    },
    {
      title: 'Real-Time Analytics',
      iconName: LucideChartSpline,
      description:
        "Track bounces, blocks, opens, and clicks instantly. Get deep insight into your server's sending reputation",
    },
  ]).asReadonly();

  readonly sproutIcon: LucideIconInput = LucideSprout;
}
