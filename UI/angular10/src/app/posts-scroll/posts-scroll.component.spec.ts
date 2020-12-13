import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsScrollComponent } from './posts-scroll.component';

describe('PostsScrollComponent', () => {
  let component: PostsScrollComponent;
  let fixture: ComponentFixture<PostsScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsScrollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
