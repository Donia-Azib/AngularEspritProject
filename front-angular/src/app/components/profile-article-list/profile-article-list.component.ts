import { ArticleService } from './../../services/article.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-article-list',
  templateUrl: './profile-article-list.component.html',
  styleUrls: ['./profile-article-list.component.css']
})
export class ProfileArticleListComponent implements OnInit,OnDestroy {
  public articleList:any=[];

  public sub$1 : Subscription;


  constructor(private service:ArticleService,private router:Router) { }


  ngOnDestroy(): void {
    if(this.sub$1 != null)
      this.sub$1.unsubscribe();
  }

  ngOnInit(): void {
    this.ReadAllUserArticle();
  }

  ReadAllUserArticle(){
    this.sub$1 = this.service.ReadUserArticles().subscribe(
      res=>{       
         
        this.articleList = res;
        console.log(this.articleList);
        
        console.log("length "+this.articleList.length);
      },
      err=>
      {console.log(err);
    })
  }
  openArticleDetail(_id:any){
    this.router.navigate(['/article/'+_id], { state: { _id: _id } });
  }
}
