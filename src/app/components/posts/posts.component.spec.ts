import { Post } from "src/app/models/Post.model"
import { PostsComponent } from "./posts.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PostService } from "src/app/services/Post/post.service";
import { of } from "rxjs";
import { Component, Input } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('Posts Component', () => {
    let POSTS: Post[];
    let component: PostsComponent;
    let mockPostService: any;
    let fixture: ComponentFixture<PostsComponent>

    @Component({
        selector: 'app-post',
        template: '<div></div>'
    })

    class FakePostComponent {
        @Input() post!: Post;
    }

    beforeEach(() => {
        POSTS = [
            {
                id: 1,
                body: 'body 1',
                title: 'title 1',
            },
            {
                id: 2,
                body: 'body 2',
                title: 'title 2'
            },
            {
                id: 3,
                body: 'body 3',
                title: 'title 3'
            }
        ]
        mockPostService = jasmine.createSpyObj(['getPosts', 'deletePost'])
        TestBed.configureTestingModule({
            declarations: [
                PostsComponent,
                FakePostComponent
            ],
            providers: [
                {
                    provide: PostService, 
                    useValue: mockPostService
                },
            ],
        })
        fixture = TestBed.createComponent(PostsComponent)
        component = fixture.componentInstance
    });

    it('should set posts from the service directly', () => {
        mockPostService.getPosts.and.returnValue(of(POSTS));
        fixture.detectChanges();
        expect(component.posts.length).toBe(3);
    })

    it('should create one post child Element for each post', () => {
        mockPostService.getPosts.and.returnValue(of(POSTS));
        fixture.detectChanges();
        const debugElement = fixture.debugElement;
        const postsElement = debugElement.queryAll(By.css('.posts'));
        expect(postsElement.length).toBe(POSTS.length)
    })

    describe('delete', () => {
        beforeEach(() => {
            mockPostService.deletePost.and.returnValue(of(true))
            component.posts = POSTS;
        })

        it('should delete the selecteed Post from the posts', () => {
            component.delete(POSTS[1]);
            expect(component.posts.length).toBe(2);
        })

        it('should delete the actual selected Post in Posts', () => {
            component.delete(POSTS[1]);
            for(let post of component.posts) {
                expect(post).not.toEqual(POSTS[1]);
            }
        })

        it('should call the delete method in Post Service only once', () => {
            component.delete(POSTS[1]);
            expect(mockPostService.deletePost).toHaveBeenCalledTimes(1);
        })
    })
})