import { Subscription } from 'rxjs';
import { ProfileInfoModalComponent } from './../profile-info-modal/profile-info-modal.component';
import { User } from './../../models/User';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit,OnDestroy {
  public user:User;
  public articleNb:number=100;
  public commNb:number=90;
  public sub$1 : Subscription


  @ViewChild('myModal') modal: ProfileInfoModalComponent;

  constructor(private service : UserService) {   
      
   }


  ngOnDestroy(): void {
    if(this.sub$1 != null)
      this.sub$1.unsubscribe()
  }


  ngOnInit(): void {
    this.ReadUserInfo()
    if(this.modal == null)
      console.log('nulll');
  }

  open() {
    this.modal.open();
  }


  ReadUserInfo(){
    this.sub$1 = this.service.ReadUserInfo().subscribe(
      (res:User)=>{
        console.log(res);
        this.user = res
        
      },
      err=>{        
        console.log(err);
    })

  }

}
