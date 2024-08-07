import { HttpClient } from "@angular/common/http";
import { PostService } from "./post.service"
import { of } from "rxjs";
import { TestBed } from "@angular/core/testing";

describe('Post Service', () => {
    let HttpClientSpy: jasmine.SpyObj<HttpClient>
    let postService: PostService;
    
    let POSTS = [
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

    beforeEach(() => {
        let HttpClientSpyObj = jasmine.createSpyObj('HttpClient', ['get']);
        TestBed.configureTestingModule({
            providers: [
                PostService, 
                {
                    provide: HttpClient, 
                    useValue: HttpClientSpyObj
                }
            ]
        });
        postService = TestBed.inject(PostService)
        HttpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    })

    describe('getPosts()', () => {
        it('should return expected posts when getPosts is called', (done: DoneFn) => {
            HttpClientSpy.get.and.returnValue(of(POSTS));
            postService.getPosts().subscribe({
                next: (posts) => {
                    expect(posts).toEqual(POSTS);
                    done();
                },
                error: () => {
                    done.fail;
                }
            })
            expect(HttpClientSpy.get).toHaveBeenCalledTimes(1);
        })
    })
})