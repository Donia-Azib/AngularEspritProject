import { ArticleService } from './../../services/article.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/Article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  private _id:string;
  public sub$1 : Subscription;
  public articleDetail : any;
  
  constructor(private router :Router,private service:ArticleService) {
    this._id = this.router.getCurrentNavigation().extras.state._id
   }

  ngOnInit(): void {
    this.ReadArticle()
  }

  ReadArticle(){    
    this.sub$1 = this.service.ReadOneArticle(this._id).subscribe(
      res=>{
        console.log(res);
        
        this.articleDetail = res
      },
      err=>{console.log(err);
      })
  }

}
