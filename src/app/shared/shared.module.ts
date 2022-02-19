import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { CommonModule } from '@angular/common';
import { UpercaseInputDirective } from './directives/upercase-input.directive';
import { SpinnerComponent } from './components/spinner/spinner.component';



@NgModule({
  declarations: [
    DeleteDialogComponent, 
    UpercaseInputDirective, 
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatToolbarModule,
    MatProgressSpinnerModule
  ],
  exports: [
    /** Material */
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    /** Components */
    DeleteDialogComponent,
    SpinnerComponent,
    /** Directives */
    UpercaseInputDirective
  ]
})
export class SharedModule { }
