import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { RegisterModalComponent } from '../register-modal/register-modal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public imageURL="assets/images/firebase_logo.png";
  public isLogged:Boolean=false;
  public lang:string;
  
  @ViewChild('myModal') modal: LoginModalComponent;
  @ViewChild('registerModal') ReModal: RegisterModalComponent;

  supportLanguages=['en','fr','es'];

  constructor(private translatorService:TranslateService,private service:UserService,private router:Router) {
    this.translatorService.addLangs(this.supportLanguages);
    this.translatorService.setDefaultLang('en');
   }

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') || 'en';
    if(this.service.LoggedUser())
      this.isLogged=true;
    else
      this.isLogged=false;
  }
  logout(){
    localStorage.removeItem('Mytoken');
    this.router.navigate(['']);
  }

  changeLang(lang:string)
  {
    console.log(lang);
    localStorage.setItem('lang',lang);
    window.location.reload(); 
    
  }
  
  open(type:string) {
    if(type === 'login')
      this.modal.open();
    else
      this.ReModal.open();
  }


}
