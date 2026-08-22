import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../globals';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class TabsPage implements OnInit {
  paletteToggle = false;
  constructor(public router: Router, public user: User) {}

  ngOnInit() {
    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    if (window.localStorage.getItem('notturnadarkmode') == 'true') {
      document.documentElement.classList.add('ion-palette-dark');
      this.paletteToggle = true;
    } else {
      // Initialize the dark palette based on the initial
      // value of the prefers-color-scheme media query
      this.initializeDarkPalette(prefersDark.matches);
    }

  

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkPalette(mediaQuery.matches));


  }
  // Check/uncheck the toggle and update the palette based on isDark
  initializeDarkPalette(isDark: boolean) {
    this.paletteToggle = isDark;
    this.toggleDarkPalette(isDark);

    //console.log ('Dark mode is ' + (isDark ? 'enabled' : 'disabled'));

    window.localStorage.setItem(
      'notturnadarkmode',
      isDark ? 'true' : 'false'
    );
  }

  // Listen for the toggle check/uncheck to toggle the dark palette
  toggleChange(event: CustomEvent) {
    this.toggleDarkPalette(event.detail.checked);
  }

  // Add or remove the "ion-palette-dark" class on the html element
  toggleDarkPalette(shouldAdd: boolean) {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
        window.localStorage.setItem(
      'notturnadarkmode',
      shouldAdd ? 'true' : 'false'
    );
  }

  openRubrica() {
    this.router.navigate(['/tabs/rubrica']);
  }
  openBackground() {
    this.router.navigate(['/tabs/background']);
  }
  openPregi() {
    this.router.navigate(['/tabs/pregi']);
  }
  openMorte() {
    this.router.navigate(['/tabs/morte']);
  }
  openCaccia() {
    this.router.navigate(['/tabs/caccia']);
  }
  setOpen(isOpen: boolean) {
    this.user.ToastFineCaccia = isOpen;
  }
  openNote() {
    this.router.navigate(['/tabs/modificanote']);
  }

}
