import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  showSpinner=false;
registerForm=new FormGroup({
  email:new FormControl('',[Validators.required,Validators.email]),
  password:new FormControl('',Validators.required),
  username:new FormControl('',Validators.required)
})
  constructor(
    private http:HttpClient,
    private toastr:ToastrService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  register(){
    this.showSpinner=true;
    const body={
      email:this.email.value,
      password:this.password.value,
      username:this.username.value
    }
    this.http.post('authentication/signup',body).subscribe((response:any)=>{
      if(response.success){
        this.showSpinner=false;
        this.registerForm.reset();
        this.router.navigate(['/login'])
        this.showSuccess(response.message);
      }
      else if(!response.success){
        this.showSpinner=false;
        this.registerForm.reset();
        this.showFailures(response.message);
      }
     
    },(error)=>{
      console.log(error);
    });


  }

  get email(){
    return this.registerForm.get('email');
  }
  get password(){
    return this.registerForm.get('password');
  }
  get username(){
    return this.registerForm.get('username');
  }

  showFailures(message){
      
    this.toastr.warning('Already Exisst', message,{progressBar:true});
  }
  showSuccess(message){
      
    this.toastr.success('Successfull!', message,{progressBar:true});
  }

}
