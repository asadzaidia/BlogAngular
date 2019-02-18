import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostserviceService {
  private getallpostById:string;
  private urlFindingComments:string;
  private urlCommentonPost:string;
  private deleteCommentUrl:string;

  posts:Object[];
  constructor(private http:HttpClient) { }

  getAllPostByID(postID){
    this.getallpostById=`posts/${postID}`;
    
    this.http.get(this.getallpostById).subscribe((response:any)=>{
      this.posts= response;
    });

    return this.posts;
  }

  getCommentsFromPost(postID){

     this.urlFindingComments=`posts/${postID}/comment`;
     return this.http.get(this.urlFindingComments)
  }

  postAcomment(postID,value:Object){
    this.urlCommentonPost=`posts/${postID}/comment`;
    return this.http.post(this.urlCommentonPost,value);
  }

  deleteAcomment(commentID){
    this.deleteCommentUrl=`posts/comment/${commentID}`;
    return this.http.delete(this.deleteCommentUrl);
  }
}
