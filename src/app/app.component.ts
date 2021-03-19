import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar>
      <router-outlet></router-outlet>
    </app-navbar>
  `,
  styles: [``],
})
export class AppComponent {
  title = 'todoapp';
}
