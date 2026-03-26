import { Component } from '@angular/core';
import { NavbarCollabComponent } from '../navbar-collab/navbar-collab';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-collab-layout',
  imports: [NavbarCollabComponent, RouterOutlet],
  templateUrl: './collab-layout.html',
  styleUrl: './collab-layout.css',
})
export class CollabLayout {}
