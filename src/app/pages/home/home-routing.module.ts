import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { AddEditComponent } from './add-edit/add-edit.component';

const routes: Routes = [
    {
      path: '',
      component: HomeComponent      
    },
    {
      path: 'add-edit/:id',
      component: AddEditComponent   
    },
  
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  
exports: [RouterModule]
})
export class HomeRoutingModule { }
