import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [NavbarComponent],
  template: `
    <div class="admin-wrapper">
      <app-navbar></app-navbar>
    </div>
  `,
  styles: [
    `
      .admin-wrapper {
        display: flex;
        height: 100vh;
        width: 100%;
        overflow: hidden;
      }
      .content-area {
        flex-grow: 1;
        background-color: #f8f9fa;
        overflow-y: auto;
        padding: 20px;
      }
    `,
  ],
})
export class AdminLayoutComponent {}
