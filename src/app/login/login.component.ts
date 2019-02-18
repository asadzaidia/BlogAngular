import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {
  errors:string="email is required\npassword is required";
  showSpinner=false;
  LoginForm=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',Validators.required)
  })
  constructor(
    private http:HttpClient,
    private toaster:ToastrService,
    private router:Router
  ) {
      
   }

  ngOnInit() {
   
  }
  validate(){

    if(this.email.invalid && this.password.invalid){
      this.errors="email is required\npassword is required";
    }else if(this.email.invalid){
      this.errors="email is required";
    }else if(this.password.invalid){
      this.errors="password is required";
    }else{
      this.errors='';
    }

  }

  login(){
    this.showSpinner=true;
    const body={
      email:this.email.value,
      password:this.password.value,
    }
    this.http.post('authentication/login',body).subscribe((response:any)=>{
      this.showSpinner=false;
      if(response.success){
        this.LoginForm.reset();
        localStorage.setItem('token',response.token);
        const token=new HttpHeaders().set('Authorization',response.token);

        this.router.navigate(['/List']); 
       
      }
      else if(!response.success){
        // this.LoginForm.reset();
        this.showFailures(response.message);
      }
     
    },(error)=>{
      console.log(error);
    });


  }
  get email(){
    return this.LoginForm.get('email');
  }
  get password(){
    return this.LoginForm.get('password');
  }

  showFailures(message){
      
    this.toaster.warning('Login Failed!', message,{progressBar:true});
  }
  showSuccess(message){
      
    this.toaster.success('Successfull!', message,{progressBar:true});
  }


}
