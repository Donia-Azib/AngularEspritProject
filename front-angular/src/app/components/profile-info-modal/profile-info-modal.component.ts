import { ProfileInfoComponent } from './../profile-info/profile-info.component';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-info-modal',
  templateUrl: './profile-info-modal.component.html',
  styleUrls: ['./profile-info-modal.component.css']
})
export class ProfileInfoModalComponent implements OnInit,OnDestroy {
  @ViewChild('content') content: any;

  public oldUserD : User;
  public myForm : FormGroup;
  public Haserrors:boolean = false;
  public UpdateErrors:string;

  public subscription$1 : Subscription;
  public subscription$2 : Subscription;

  constructor(private modalService : NgbModal,private fb:FormBuilder,
    private service:UserService, private router:Router)
    {
      let formControls =
      {
        username : new FormControl('',[
          Validators.required,
          Validators.pattern("[a-z . '-]+"),
          Validators.minLength(3)
        ]),
        email : new FormControl('',[
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ])
      };
      this.myForm = this.fb.group(formControls);
    }


  ngOnDestroy(): void {
      if(this.subscription$1 != null)
        this.subscription$1.unsubscribe()
      if(this.subscription$2 != null)
        this.subscription$2.unsubscribe()
  }


  ngOnInit(): void {
    this.setUserDetails();
  }
  

  setUserDetails(){
    this.subscription$2 = this.service.ReadUserInfo().subscribe(
      (user:User)=>{
      this.oldUserD = user
      this.myForm.patchValue({
        username : this.oldUserD.username,
        email : this.oldUserD.email
      });
    },err=>{
      console.log('error'); 
      console.log(err);
    })
  }
  
  open() {
    this.modalService.open(this.content)
    .result.then((result) => {
      console.log( `Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed`);
      window.location.reload(); 
    });
  }

  Update(){
    console.log('eq email '+(this.oldUserD.email == this.myForm.value?.email));
    console.log('eq username '+(this.oldUserD.username == this.myForm.value?.username));
    
    let newUser = new User( this.myForm.value?.email, this.oldUserD.password,
     this.myForm.value?.username );
    this.subscription$1 = this.service.UpdateUserDetails(newUser)
    .subscribe(res=>{
      console.log('updated......');
      
      console.log(res);
      
      this.modalService.dismissAll()
    },err=>{
      console.log('error');
      console.log(err);
      this.Haserrors = true
      this.UpdateErrors = err     
      
    })
    
  }


  get username()
  {
    return this.myForm.get('username');
  }
  get email()
  {
    return this.myForm.get('email');
  }
}
