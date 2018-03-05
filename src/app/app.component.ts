import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<block-ui><router-outlet><app-spinner></app-spinner></router-outlet></block-ui>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
