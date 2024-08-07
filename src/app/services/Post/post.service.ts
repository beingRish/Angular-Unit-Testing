import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from 'src/app/models/Post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  url = `https://jsonplaceholder.typicode.com/posts`

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get<Post[]>(this.url)
  }

  getPost(postId: number) {
    return this.http.get<Post>(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
  }

  deletePost(post: Post) {
    return this.http.delete(`${this.url}/${post.id}`)
  }
}
