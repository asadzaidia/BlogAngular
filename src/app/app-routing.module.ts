import { AuthGuardService } from './auth-guard.service';
import { DetailsComponent } from './details/details.component';
import { CreatepostComponent } from './createpost/createpost.component';
import { ListofpostsComponent } from './listofposts/listofposts.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path:'',
    component:SignupComponent,
    
  },
  {
    path:'login',
    component:LoginComponent,
    // canActivate:[AuthGuardService]
  },
  {
    path:'List',
    component:ListofpostsComponent,
    canActivate:[AuthGuardService]
  
  },
  {
    path:'create',
    component:CreatepostComponent,
    canActivate:[AuthGuardService]
    
    
  },
  {
    path:'details/:id',
    component:DetailsComponent,
    canActivate:[AuthGuardService]
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
