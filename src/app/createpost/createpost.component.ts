import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent implements OnInit {

  postForm=new FormGroup({
    title:new FormControl('',Validators.required),
    content:new FormControl('',Validators.required)
  })
  constructor(private http:HttpClient,private toastr:ToastrService) { }

  ngOnInit() {
    
  }
  createPost(){
    const body={
      title:this.title.value,
      content:this.title.value
    }

    this.http.post('posts',body).subscribe((result:any)=>{
      if(result.success){
       this.showSuccess();
       this.postForm.reset();
        
      }
    },(error)=>{
      console.log(error);
    }
    )}

    showSuccess(){
      
      this.toastr.success('Created', 'PostCreatedSuccessfully!',{progressBar:true});
    }



  get title(){
    return this.postForm.get('title');
  }

  get content(){
    return this.postForm.get('content');
  }

}
