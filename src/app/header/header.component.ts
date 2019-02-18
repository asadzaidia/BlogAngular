import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,DoCheck{
showLogoutButton:boolean=false;
  constructor(private router:Router) { }

  ngOnInit() {
    
  }

  
  ngDoCheck(){
    if(localStorage.getItem('token')){
      this.showLogoutButton=true;
      console.log('checking',this.showLogoutButton);
    }
  }
  

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
    this.showLogoutButton=false;
  }
}
