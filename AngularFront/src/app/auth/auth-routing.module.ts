import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { SignupComponent } from './signup/signup.component';
import { MaterialModule } from '../material/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
  {path:'',redirectTo:"signup",pathMatch:'full'},
  {path:'signup',component:SignupComponent},
  {path: '', component: AuthComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CommonModule
  ],
  exports: [RouterModule],
  declarations: [
    SignupComponent
  ]
})
export class AuthRoutingModule { }
