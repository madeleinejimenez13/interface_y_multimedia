import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent {
  userForm: FormGroup;
  maxDate: Date;

  roles = [
    { value: 'admin', label: 'Administrador' },
    { value: 'editor', label: 'Editor' },
    { value: 'viewer', label: 'Visor' },
    { value: 'user', label: 'Usuario' }
  ];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    // Establecer fecha máxima (18 años atrás desde hoy)
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);

    // Crear formulario con validaciones
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      birthDate: ['', Validators.required],
      role: ['', Validators.required],
      address: [''],
      city: ['', Validators.required]
    });
  }

  // Métodos para obtener errores de los campos
  getErrorMessage(field: string): string {
    const control = this.userForm.get(field);
    
    if (control?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    
    if (control?.hasError('email')) {
      return 'Ingrese un email válido';
    }
    
    if (control?.hasError('minlength')) {
      const minLength = control.errors?.['minlength'].requiredLength;
      return `Mínimo ${minLength} caracteres`;
    }
    
    if (control?.hasError('pattern')) {
      if (field === 'phone') {
        return 'Ingrese un teléfono de 10 dígitos';
      }
    }
    
    return '';
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Formulario válido:', this.userForm.value);
      
      this.snackBar.open('Usuario registrado exitosamente', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['success-snackbar']
      });
      
      // Resetear el formulario
      this.userForm.reset();
    } else {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.userForm.controls).forEach(key => {
        this.userForm.get(key)?.markAsTouched();
      });
      
      this.snackBar.open('Por favor, complete todos los campos requeridos', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
    }
  }

  onCancel() {
    this.userForm.reset();
    this.snackBar.open('Formulario cancelado', 'Cerrar', {
      duration: 2000
    });
  }
}
