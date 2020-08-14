import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BlogService } from '../service/blog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Blog } from '../model/blog';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss'],
})
export class CreateBlogComponent implements OnInit {
  blog: Blog;
  blogForm = new FormGroup({
    id: new FormControl(),
    title: new FormControl('', Validators.required),
    date: new FormControl(),
    imgUrl: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });
  constructor(
    private blogService: BlogService,
    private router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    return this._route.paramMap.subscribe((parameterMap) => {
      const id = +parameterMap.get('id');
      if (id) {
        this.getData(id);
      }
    });
  }

  getData(id: number) {
    return this.blogService
      .getBlogsById(id)
      .subscribe((blog: Blog) => this.editsBlog(blog));
  }

  editsBlog(blog: Blog) {
    this.blogForm.patchValue({
      title: blog.title,
      date: blog.date,
      rating: blog.rating,
      imgUrl: blog.imgUrl,
      description: blog.description,
    });
  }
  onFormSubmit() {
    if (this.blogForm.valid) {
      this.blogForm.controls.id.setValue(this.getId() + 1);
      this.blogForm.controls.date.setValue(new Date());
      this.blogService.addBlog(this.blogForm.value);
      this.router.navigate(['']);
    } else {
      console.log(this.blogForm.valid);
    }
  }

  getId() {
    return Math.max.apply(
      Math,
      this.blogService.blogs.map(function (o) {
        return o.id;
      })
    );
  }

  get imageUrl() {
    return this.blogForm.value.imgUrl;
  }
}
