import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiHost ="http://localhost:3000/api/"
  private api_login = this.apiHost+"auth/login"
  private api_register = this.apiHost+"auth/signup"


  constructor(private http : HttpClient) { }

  SignInUser(user:User)
  {
   return this.http.post<any>(this.api_login,user);
  }

  SignUpUser(user:User)
  {
   return this.http.post<any>(this.api_register,user);
  }
  
  LoggedUser()
  {
    if(localStorage.getItem('Mytoken'))
      return true; 
    else
      return false;
  }
 
}
