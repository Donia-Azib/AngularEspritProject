import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { ArticleService } from './../../services/article.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/Article';

@Component({
  selector: 'app-add-article-form',
  templateUrl: './add-article-form.component.html',
  styleUrls: ['./add-article-form.component.css']
})
export class AddArticleFormComponent implements OnInit,OnDestroy {

  public selectedFile:File= null;
  public myForm : FormGroup;
  public Haserrors:boolean = false;
  public RegisterErrors:string;
  public article : Article;
  public user : User;
  public imagePreview: string;

  public subscription$1 : Subscription;
  public subscription$2 : Subscription;

  
  constructor(private service:ArticleService,private userservice:UserService,
    private fb:FormBuilder,
    private router:Router) {
      let formControls =
      {
        title : new FormControl('',[
          Validators.required,
          Validators.pattern("[a-z A-Z 0-9. '-]+"),
          Validators.minLength(3)
        ]),
        desc : new FormControl('',[
          Validators.required,
          Validators.pattern("[a-z A-Z 0-9 , . '-]+"),
        ]),
        publish :new FormControl(),
        image:new FormControl(null,Validators.required)
      };
      this.myForm = this.fb.group(formControls);
    }
  ngOnDestroy(): void {
    if(this.subscription$1 != null)
      this.subscription$1.unsubscribe()
  }

  ngOnInit(): void {
    this.ReadUserInfo()
  }

  AddArticle(){
    this.article = new Article(this.myForm.value?.title,this.myForm.value?.desc,'',this.myForm.value?.publish,this.user._id,this.user.username)
    console.log(this.article);
    this.subscription$1 = this.service.AddArticle(this.article, this.myForm.get('image').value).subscribe(
      (res) => {
        this.myForm.reset();
        console.log('BIEN.....');
        console.log(res);
        
        // this.router.narvigate(['/profil']);
      },
      (error) => {
        console.log('error....');
        
        console.log(error);
        
      }
    );
    
     
      // this.subscription$1 = this.service.AddArticle(this.article).subscribe(res=>{
      //   console.log('added ... ');
      //   console.log(res);
        
        
      // }),
      // err=>{
      //   console.log('error ...');
        
      //   console.log(err);
        
      // };
  }

  onImagePick(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.myForm.get('image').patchValue(file);
    this.myForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      if (this.myForm.get('image').valid) {
        this.imagePreview = reader.result as string;
      } else {
        this.imagePreview = null;
      }
    };
    reader.readAsDataURL(file);
  }

  ReadUserInfo(){
    this.subscription$2 = this.userservice.ReadUserInfo().subscribe(
      (res:User)=>{
        console.log(res);
        this.user = res;
      },
      err=>{        
        console.log(err);
      })

  }
  get title()
  {
    return this.myForm.get('title');
  }
  get desc()
  {
    return this.myForm.get('desc');
  }
}
