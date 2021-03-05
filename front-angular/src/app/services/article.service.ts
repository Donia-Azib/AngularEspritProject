import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../models/Article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiHost ="http://localhost:3000/api/stuff"
  private api_all_article = this.apiHost+"/"
  private api_add_article = this.apiHost+"/add"
  private api_update_article = this.apiHost+"/"//+article_id
  private api_delete_article = this.apiHost+"/"//+article_id
  private api_get_article = this.apiHost+"/"//+article_id
  private api_get_user_article = this.apiHost+"/user/blog"


  private auth_token = localStorage.getItem('Mytoken');
  
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.auth_token}`
  })

  constructor(private http : HttpClient) { }

  ReadAllArticles()
  {
    return this.http.get(this.api_all_article,{ headers: this.headers });
  }

  AddArticle(article:Article,image:File){
    const thingData = new FormData();
    thingData.append('thing', JSON.stringify(article));
    thingData.append('image', image, article.title);
    
    return this.http.post(this.api_add_article,thingData,{ headers: this.headers })
  }

  ReadOneArticle(id:string){
    return this.http.get(this.api_get_article+id,{ headers: this.headers });
  }

  DeleteArticle(id:string){
    return this.http.delete(this.api_delete_article+id,{ headers: this.headers });
  }

  UpdateArticle(article:Article,id:string){
    return this.http.put(this.api_delete_article+article+id,article,{ headers: this.headers });
  }

  ReadUserArticles(){
    return this.http.get(this.api_get_user_article,{ headers: this.headers });
  }
}
