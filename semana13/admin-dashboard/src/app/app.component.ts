import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  
  title = 'Admin Dashboard';
  isMobile = false;
  sidenavMode: 'over' | 'side' = 'side';
  sidenavOpened = true;

  menuItems = [
    { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
    { icon: 'person_add', label: 'Registrar Usuario', route: '/users/register' },
    { icon: 'people', label: 'Lista de Usuarios', route: '/users/list' }
  ];

  constructor(private breakpointObserver: BreakpointObserver) {
    // Detectar si estamos en modo móvil para ajustar el comportamiento del sidenav
    this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
      .subscribe(result => {
        this.isMobile = result.matches;
        
        if (this.isMobile) {
          // En móvil: el menú se superpone y está cerrado por defecto
          this.sidenavMode = 'over';
          this.sidenavOpened = false;
        } else {
          // En desktop: el menú está al lado y abierto por defecto
          this.sidenavMode = 'side';
          this.sidenavOpened = true;
        }
      });
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  // Cerrar el sidenav automáticamente en móvil después de hacer clic en un enlace
  onMenuItemClick() {
    if (this.isMobile) {
      this.sidenav.close();
    }
  }
}
