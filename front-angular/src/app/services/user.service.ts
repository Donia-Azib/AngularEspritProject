import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiHost ="http://localhost:3000/api/auth/"
  private api_login = this.apiHost+"login"
  private api_register = this.apiHost+"signup"
  private api_getUserInfo = this.apiHost+"details"
  private api_updateUserDetails = this.apiHost+"details/update"

  private auth_token = localStorage.getItem('Mytoken');
  
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.auth_token}`
  })


  constructor(private http : HttpClient) { }

  SignInUser(user:User)
  {
   return this.http.post<any>(this.api_login,user);
  }

  SignUpUser(user:User)
  {
   return this.http.post<any>(this.api_register,user);
  }
  ReadUserInfo()
  {
   return this.http.get<any>(this.api_getUserInfo,{ headers: this.headers });
  }
  UpdateUserDetails(user:User)
  {
   return this.http.put<any>(this.api_updateUserDetails,user,{ headers: this.headers });
  }
  
  
  LoggedUser()
  {
    if(this.auth_token)
      return true; 
    else
      return false;
  }
 
}
