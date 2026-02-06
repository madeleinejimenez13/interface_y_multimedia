import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface DialogData {
  title: string;
  message: string;
  user?: any;
  type: 'delete' | 'view';
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <h2 mat-dialog-title>
      <mat-icon [class.delete-icon]="data.type === 'delete'" [class.view-icon]="data.type === 'view'">
        {{ data.type === 'delete' ? 'delete_forever' : 'visibility' }}
      </mat-icon>
      {{ data.title }}
    </h2>
    
    <mat-dialog-content>
      <p>{{ data.message }}</p>
      
      <div *ngIf="data.type === 'view' && data.user" class="user-details">
        <div class="detail-row">
          <strong>Nombre:</strong>
          <span>{{ data.user.firstName }} {{ data.user.lastName }}</span>
        </div>
        <div class="detail-row">
          <strong>Email:</strong>
          <span>{{ data.user.email }}</span>
        </div>
        <div class="detail-row">
          <strong>Teléfono:</strong>
          <span>{{ data.user.phone }}</span>
        </div>
        <div class="detail-row">
          <strong>Rol:</strong>
          <span class="role-badge">{{ data.user.role }}</span>
        </div>
        <div class="detail-row">
          <strong>Estado:</strong>
          <span [class.active]="data.user.status === 'Activo'" [class.inactive]="data.user.status !== 'Activo'">
            {{ data.user.status }}
          </span>
        </div>
      </div>
    </mat-dialog-content>
    
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">
        {{ data.type === 'delete' ? 'Cancelar' : 'Cerrar' }}
      </button>
      <button 
        *ngIf="data.type === 'delete'"
        mat-raised-button 
        color="warn"
        (click)="onConfirm()">
        <mat-icon>delete</mat-icon>
        Eliminar
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    h2 {
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 0;
      
      mat-icon {
        font-size: 32px;
        width: 32px;
        height: 32px;
        
        &.delete-icon {
          color: #f44336;
        }
        
        &.view-icon {
          color: #673ab7;
        }
      }
    }

    mat-dialog-content {
      padding: 20px 0;
      min-width: 400px;

      p {
        margin-bottom: 16px;
        color: #666;
      }

      .user-details {
        background-color: #f5f5f5;
        padding: 16px;
        border-radius: 8px;
        margin-top: 16px;

        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #e0e0e0;

          &:last-child {
            border-bottom: none;
          }

          strong {
            color: #333;
          }

          span {
            color: #666;

            &.role-badge {
              background-color: #673ab7;
              color: white;
              padding: 4px 12px;
              border-radius: 12px;
              font-size: 12px;
              font-weight: 500;
            }

            &.active {
              color: #4caf50;
              font-weight: 600;
            }

            &.inactive {
              color: #f44336;
              font-weight: 600;
            }
          }
        }
      }
    }

    mat-dialog-actions {
      padding: 16px 0 0;

      button mat-icon {
        margin-right: 8px;
      }
    }

    @media (max-width: 600px) {
      mat-dialog-content {
        min-width: 280px;
      }
    }
  `]
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
