import {NgModule} from '@angular/core';
import {ContentFieldTableComponent} from './content-field-table.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ContentFieldTableItemComponent} from './content-field-table-item/content-field-table-item.component';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ContentFieldTableItemExpandedComponent} from './content-field-table-item-expanded/content-field-table-item-expanded.component';

@NgModule({
  declarations: [ContentFieldTableComponent, ContentFieldTableItemComponent, ContentFieldTableItemExpandedComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    MatCheckboxModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatToolbarModule
  ],
  exports: [ContentFieldTableComponent]
})
export class ContentFieldTableModule { }
