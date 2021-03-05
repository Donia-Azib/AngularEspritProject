import { ProfileComponent } from './components/profile/profile.component';
import { AuthGardGuard } from './auth-gard.guard';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { Page404Component } from './components/page404/page404.component';
import { RegisterModalComponent } from './components/register-modal/register-modal.component';
import { ArticleComponent } from './components/article/article.component';
import { AddArticleFormComponent } from './components/add-article-form/add-article-form.component';


const routes: Routes = [
  {
    path:'',component:HomeComponent
  },
  {
    path:'article-list',component:ArticleListComponent,canActivate:[AuthGardGuard]
  },
  {
    path:'article/:id',component:ArticleComponent,canActivate:[AuthGardGuard]
  },
  {
    path:'profil',component:ProfileComponent,canActivate:[AuthGardGuard]
  },
  {
    path:'AddArticle',component:AddArticleFormComponent,canActivate:[AuthGardGuard]
  },
  {
    path:'**',component:Page404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
