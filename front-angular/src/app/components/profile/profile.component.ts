import { User } from './../../models/User';
import { Subscription } from 'rxjs';
import { UserService } from './../../services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit,OnDestroy {

  public username:String;
  public sub$1:Subscription;
  
  constructor(private service : UserService) { }

  ngOnDestroy(): void {
    if(this.sub$1 != null)
      this.sub$1.unsubscribe()
  }

  ngOnInit(): void {
    this.ReadUserInfo()
  }

  ReadUserInfo(){
    this.sub$1 = this.service.ReadUserInfo().subscribe(
      (res:User)=>{
        console.log(res);
        this.username = res.username
        
      },
      err=>{        
        console.log(err);
      })

  }
}
