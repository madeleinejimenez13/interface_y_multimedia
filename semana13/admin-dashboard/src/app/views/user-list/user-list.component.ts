import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  registeredDate: Date;
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'status', 'actions'];
  
  dataSource: User[] = [
    {
      id: 1,
      firstName: 'Juan',
      lastName: 'Pérez',
      email: 'juan.perez@example.com',
      phone: '0999123456',
      role: 'Administrador',
      status: 'Activo',
      registeredDate: new Date('2024-01-15')
    },
    {
      id: 2,
      firstName: 'María',
      lastName: 'García',
      email: 'maria.garcia@example.com',
      phone: '0999234567',
      role: 'Editor',
      status: 'Activo',
      registeredDate: new Date('2024-02-20')
    },
    {
      id: 3,
      firstName: 'Carlos',
      lastName: 'López',
      email: 'carlos.lopez@example.com',
      phone: '0999345678',
      role: 'Visor',
      status: 'Inactivo',
      registeredDate: new Date('2024-03-10')
    },
    {
      id: 4,
      firstName: 'Ana',
      lastName: 'Martínez',
      email: 'ana.martinez@example.com',
      phone: '0999456789',
      role: 'Usuario',
      status: 'Activo',
      registeredDate: new Date('2024-04-05')
    },
    {
      id: 5,
      firstName: 'Pedro',
      lastName: 'Rodríguez',
      email: 'pedro.rodriguez@example.com',
      phone: '0999567890',
      role: 'Editor',
      status: 'Activo',
      registeredDate: new Date('2024-05-12')
    },
    {
      id: 6,
      firstName: 'Laura',
      lastName: 'Fernández',
      email: 'laura.fernandez@example.com',
      phone: '0999678901',
      role: 'Usuario',
      status: 'Inactivo',
      registeredDate: new Date('2024-06-18')
    }
  ];

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  viewUser(user: User): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {
        title: 'Detalles del Usuario',
        message: 'Información completa del usuario:',
        user: user,
        type: 'view'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Diálogo cerrado');
    });
  }

  deleteUser(user: User): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        title: 'Confirmar Eliminación',
        message: `¿Está seguro que desea eliminar al usuario ${user.firstName} ${user.lastName}? Esta acción no se puede deshacer.`,
        type: 'delete'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Eliminar usuario del array
        const index = this.dataSource.indexOf(user);
        if (index > -1) {
          this.dataSource = this.dataSource.filter((_, i) => i !== index);
        }

        this.snackBar.open(`Usuario ${user.firstName} ${user.lastName} eliminado correctamente`, 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
      }
    });
  }

  getRoleColor(role: string): string {
    const colors: { [key: string]: string } = {
      'Administrador': 'primary',
      'Editor': 'accent',
      'Visor': '',
      'Usuario': ''
    };
    return colors[role] || '';
  }

  getStatusColor(status: string): string {
    return status === 'Activo' ? 'success' : 'warn';
  }
}
