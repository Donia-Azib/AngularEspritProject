import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArticleService } from './../../services/article.service';
import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/Article';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  public articleList:any=[];

  public sub$1 : Subscription;

  constructor(private service:ArticleService,private router:Router) { }

  ngOnInit(): void {
    this.ReadAllArticle()
  }

  ReadAllArticle(){
    this.sub$1 = this.service.ReadAllArticles().subscribe(
      res=>{        
        this.articleList = res;
      },
      err=>
      {console.log(err);
    })
  }
  openArticleDetail(_id:any){
    this.router.navigate(['/article/'+_id], { state: { _id: _id } });
  }

}
