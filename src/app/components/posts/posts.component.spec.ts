import { Post } from "src/app/models/Post.model"
import { PostsComponent } from "./posts.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PostService } from "src/app/services/Post/post.service";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";
import { PostComponent } from "../post/post.component";
import { RouterTestingModule } from "@angular/router/testing";

describe('Posts Component', () => {
    let POSTS: Post[];
    let component: PostsComponent;
    let mockPostService: any;
    let fixture: ComponentFixture<PostsComponent>

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
                PostComponent
            ],
            imports: [RouterTestingModule],
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

    it('should create exact same number of Post Component with Posts', () => {
        mockPostService.getPosts.and.returnValue(of(POSTS));
        // ngOnInit();
        fixture.detectChanges();
        const PostComponentDEs = fixture.debugElement.queryAll(
            By.directive(PostComponent)
        );
        expect(PostComponentDEs.length).toEqual(POSTS.length);
    })

    it('should check whether exact post is sending to PostComponent', () => {
        mockPostService.getPosts.and.returnValue(of(POSTS));
        fixture.detectChanges();
        const postComponentDEs = fixture.debugElement.queryAll(By.directive(PostComponent))

        for (let i = 0; i < postComponentDEs.length; i++) {
            let postComponentInstance = postComponentDEs[i].componentInstance as PostComponent;
            expect(postComponentInstance.post.title).toEqual(POSTS[i].title);
        }
    })

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
            for (let post of component.posts) {
                expect(post).not.toEqual(POSTS[1]);
            }
        })

        it('should call the delete method in Post Service only once', () => {
            component.delete(POSTS[1]);
            expect(mockPostService.deletePost).toHaveBeenCalledTimes(1);
        })

        it('should call delete method when post component button is clicked', () => {
            spyOn(component, 'delete').and.callThrough();
            mockPostService.getPosts.and.returnValue(of(POSTS));
            fixture.detectChanges();

            let postComponentDEs = fixture.debugElement.queryAll(
                By.directive(PostComponent)
            );

            postComponentDEs.forEach((postComponentDE, i) => {
                const event = new Event('click');
                postComponentDE
                    .query(By.css('button'))
                    .triggerEventHandler('click', event);
                expect(component.delete).toHaveBeenCalledWith(POSTS[i]);
            })
        })

        it('should call the delete method when the delete event is emitted in Post Component', () => {
            spyOn(component, 'delete');
            mockPostService.getPosts.and.returnValue(of(POSTS));
            fixture.detectChanges();

            let postComponentDEs = fixture.debugElement.queryAll(By.directive(PostComponent));

            postComponentDEs.forEach((postComponentDE, i) => {
                (postComponentDE.componentInstance as PostComponent).delete.emit(POSTS[0])
                expect(component.delete).toHaveBeenCalledWith(POSTS[0])
            })
        })
    })
})