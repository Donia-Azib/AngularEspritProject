import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service:UserService,private router:Router) { }

  ngOnInit(): void {
    if(this.service.LoggedUser())
      this.router.navigate(['/article-list']);
  }

}
