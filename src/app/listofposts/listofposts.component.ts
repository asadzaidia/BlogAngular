import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-listofposts',
  templateUrl: './listofposts.component.html',
  styleUrls: ['./listofposts.component.css']
})
export class ListofpostsComponent implements OnInit {
public posts:Object;
private url='/posts';

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.http.get(this.url).subscribe((response)=>{
      this.posts=response;  
    },(error)=>{
      console.log(error) ;
       });
  }


}
