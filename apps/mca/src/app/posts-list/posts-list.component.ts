import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from '../+state/models/post.model';
import { AppState } from '../+state/app.state';
import { deletePostAction, loadPosts } from '../+state/posts/posts.actions';
import { getPosts } from '../+state/posts/posts.selectors';

@Component({
  selector: 'compass-ui-app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  posts!: Observable<Post[]>;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.posts = this.store.select(getPosts);
    this.store.dispatch(loadPosts());
  }
  onDeletePost(id: any){
    if(confirm("Are you sure, you want to delete this post?")){
      this.store.dispatch(deletePostAction({id}));
    }
  }
}
