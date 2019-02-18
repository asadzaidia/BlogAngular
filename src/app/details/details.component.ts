import { PostserviceService } from './../postservice.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import {FormGroup,FormControl, Validators} from '@angular/forms';
import { Post } from './post.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

id:any;
private deleteCommentUrl:string;
  constructor(private route:ActivatedRoute,private postservice:PostserviceService) { }
  post:Object[];
  comments:Object[];

commentForm=new FormGroup({
  comment:new FormControl('',Validators.required)
 
});




  ngOnInit() {
   
//getting id from param
    this.route.params.subscribe(params => {
      this.id = params['id'];
   
    
      });

      
//finding id from postid
this.post=this.postservice.getAllPostByID(this.id)
     
    
    //finding comments from post id
    this.postservice.getCommentsFromPost(this.id).subscribe((response:any)=>{
      this.comments=response.comments;
    });  
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    const comment=this.commentForm.value.comment;
    //post a comment
    this.postservice.postAcomment(this.id,this.commentForm.value).subscribe((response:any)=>{
      if(response.success){
        this.postservice.getCommentsFromPost(this.id).subscribe((response:any)=>{
          this.comments=response.comments;
        }); 
    }
    },(error)=>{
      console.log(error);
    });
  }

  deleteComment(id){
    
    this.postservice.deleteAcomment(id).subscribe((response:any)=>{
      if(response.success){
        //updated comments from post id
        this.postservice.getCommentsFromPost(this.id).subscribe((response:any)=>{
          this.comments=response.comments;
        }); 
      }
    },(error)=>{
      console.log(error);
    })
  }

}
