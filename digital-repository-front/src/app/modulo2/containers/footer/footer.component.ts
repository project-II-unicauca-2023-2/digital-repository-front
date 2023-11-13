import { Component } from '@angular/core';

import { AppColors } from 'src/colors.config';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  appColors = AppColors;
}
