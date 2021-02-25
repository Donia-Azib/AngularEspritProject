import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit,OnDestroy {

  @ViewChild('content') content: any;

  public myForm : FormGroup;
  public Haserrors:boolean = false;
  public LoginErrors:string;

  public subscription$1 : Subscription;

  constructor(
    private modalService : NgbModal,private router:Router,
    private fb:FormBuilder,private service:UserService) 
  {
    let formControls =
    {
      password : new FormControl('',[
        Validators.required,
        Validators.minLength(8)
      ]),
      email : new FormControl('',[
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
      ]),
    };
    this.myForm = this.fb.group(formControls);
  }
  ngOnDestroy(): void {
    if(this.subscription$1 != null)
      this.subscription$1.unsubscribe();
  }
  
  ngOnInit(){}

  open() {
    this.modalService.open(this.content)
    .result.then((result) => {
      console.log( `Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed`);
    });
  }

  login(){
    let data = this.myForm.value;
    let user = new User(data.email,data.password);
    console.log(user);
    this.service.SignInUser(user).subscribe(
      res=>{
        console.log(res);
        let token = res.token;
        let userId = res.userId
        localStorage.setItem('Mytoken',token);
        localStorage.setItem('UserId',userId);
        this.router.navigate(['/article-list']);
        this.modalService.dismissAll()
      },
      error=>
      {
        this.Haserrors = true
        this.LoginErrors = error.error.error
        console.log("Error : "+error.error.error);
        
      }
    );
    
  }
  
  get password()
  {
    return this.myForm.get('password');
  }
  
  get email()
  {
    return this.myForm.get('email');
  }

  

}
