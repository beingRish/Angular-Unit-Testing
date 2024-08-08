import { ComponentFixture, TestBed } from "@angular/core/testing"
import { PostDetailComponent } from "./post-detail.component"
import { Location } from '@angular/common';
import { PostService } from "src/app/services/Post/post.service";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { Post } from "src/app/models/Post.model";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

describe('PostDetailComponent', () => {
  let fixture: ComponentFixture<PostDetailComponent>
  let mockPostService: jasmine.SpyObj<PostService>
  beforeEach(() => {

    let mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => {
            return '3';
          }
        }
      }
    };
    mockPostService = jasmine.createSpyObj('PostService', ['getPost', 'updatePost']);
    let mockLocation = jasmine.createSpyObj(['back']);

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [PostDetailComponent],
      providers: [
        { provide: Location, useValue: mockLocation },
        { provide: PostService, useValue: mockPostService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ]
    })

    fixture = TestBed.createComponent(PostDetailComponent)
  });

  it('should render the post title in h2 template', () => {
    mockPostService.getPost.and.returnValue(
      of({
        id: 3,
        title: 'Title 1',
        body: 'Body 1'
      } as Post)
    )
    fixture.detectChanges();
    // const element = fixture.debugElement.query(By.css('h2')).nativeElement as HTMLElement
    const element = fixture.nativeElement.querySelector('h2') as HTMLElement;
    expect(element.textContent).toBe(fixture.componentInstance.post.title);
  })
})