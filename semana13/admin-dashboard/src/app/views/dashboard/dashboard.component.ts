import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  stats = [
    { 
      title: 'Usuarios Totales', 
      value: '1,234', 
      icon: 'people', 
      color: '#673ab7',
      change: '+12%'
    },
    { 
      title: 'Usuarios Activos', 
      value: '856', 
      icon: 'person', 
      color: '#ffa726',
      change: '+8%'
    },
    { 
      title: 'Nuevos Registros', 
      value: '47', 
      icon: 'person_add', 
      color: '#66bb6a',
      change: '+23%'
    },
    { 
      title: 'Roles Asignados', 
      value: '5', 
      icon: 'verified_user', 
      color: '#ef5350',
      change: '0%'
    }
  ];

  recentActivities = [
    { user: 'Juan Pérez', action: 'Se registró en el sistema', time: 'Hace 2 minutos' },
    { user: 'María García', action: 'Actualizó su perfil', time: 'Hace 15 minutos' },
    { user: 'Carlos López', action: 'Cambió su rol a Admin', time: 'Hace 1 hora' },
    { user: 'Ana Martínez', action: 'Eliminó su cuenta', time: 'Hace 2 horas' }
  ];
}
