import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner-loader.component.html',
  styleUrls: ['./spinner-loader.component.scss'],
  imports: [CommonModule],
})
export class SpinnerLoaderComponent {
  @Input({ required: true }) isSpinnerLoading = true;
  @Input() inputHeight!: string;
  inputedColor = '#e5353b';
}
