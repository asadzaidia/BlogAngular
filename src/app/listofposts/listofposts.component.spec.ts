import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListofpostsComponent } from './listofposts.component';

describe('ListofpostsComponent', () => {
  let component: ListofpostsComponent;
  let fixture: ComponentFixture<ListofpostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListofpostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListofpostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
