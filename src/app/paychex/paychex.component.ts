import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-paychex',
  templateUrl: './paychex.component.html',
  styleUrl: './paychex.component.css',
})
export class PaychexComponent {
  link: any = 'https://myapps.paychex.com/landing_remote/login.do?lang=en';
  constructor(private elementRef: ElementRef) {}

  openLinkInContainer(event: Event, container: HTMLDivElement): void {
    event.preventDefault();
    const link = (event.target as HTMLAnchorElement).href;
    container.innerHTML = `<iframe src="${link}" width="1100px" height="800px"></iframe>`;
  }
}
