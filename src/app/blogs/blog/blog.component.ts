import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  @Input() blog;
  @Output() delectBlog = new EventEmitter();
  rating = [1, 2, 3, 4, 5];
  constructor(private router: Router) {}

  ngOnInit(): void {}

  deleteBlog() {
    this.delectBlog.emit();
  }
  onClickStar(i: number) {
    if (this.blog.rating === i) {
      this.blog.rating = 0;
    } else {
      this.blog.rating = i;
    }
    console.log(i);
  }
  editBlog() {
    this.router.navigate(['/edit', this.blog.id]);
  }
}
