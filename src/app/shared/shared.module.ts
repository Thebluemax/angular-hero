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
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { CommonModule } from '@angular/common';
import { UpercaseInputDirective } from './directives/upercase-input.directive';



@NgModule({
  declarations: [DeleteDialogComponent, UpercaseInputDirective],
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
    /** Components */
    DeleteDialogComponent,
    /** Directives */
    UpercaseInputDirective
  ]
})
export class SharedModule { }
