import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DataViewModule } from 'primeng/dataview';
import { FormsModule } from '@angular/forms';
import { AddEditComponent } from './add-edit/add-edit.component';

@NgModule({
  declarations: [HomeComponent, AddEditComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    DataViewModule,
    FormsModule
  ]
})
export class HomeModule { }
