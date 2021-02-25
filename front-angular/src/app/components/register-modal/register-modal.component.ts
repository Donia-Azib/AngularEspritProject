import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css']
})
export class RegisterModalComponent implements OnInit,OnDestroy {

  @ViewChild('content') content: any;
  @ViewChild('myModal') modal: LoginModalComponent;

  public myForm : FormGroup;
  public Haserrors:boolean = false;
  public RegisterErrors:string;

  public subscription$1 : Subscription;


  constructor(private modalService : NgbModal,private fb:FormBuilder,
    private service:UserService, private router:Router) {
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
        ]),
        password : new FormControl('',[
          Validators.required,
          Validators.minLength(8)
        ]),
        cnf_password : new FormControl('',[
          Validators.required,
          Validators.minLength(8)
        ]),
      };
      this.myForm = this.fb.group(formControls);
    }

  ngOnDestroy(): void {
    if(this.subscription$1 != null)
      this.subscription$1.unsubscribe()
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

  Register(){
    let data = this.myForm.value;
    let user = new User(data.email,data.password,data.username);
    console.log(user);
    this.subscription$1 = this.service.SignUpUser(user).subscribe(
      res=>{
        this.modalService.dismissAll()
        this.modal.open()
      },
      error=>
      {
        this.Haserrors = true
        this.RegisterErrors = error.error.error
        console.log("Error : "+error.error.error);
      }
    );
    
  }

  get username()
  {
    return this.myForm.get('username');
  }
  get email()
  {
    return this.myForm.get('email');
  }
  get password()
  {
    return this.myForm.get('password');
  }
  get cnf_password()
  {
    return this.myForm.get('cnf_password');
  }

}
