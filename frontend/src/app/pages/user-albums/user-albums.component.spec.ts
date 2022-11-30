import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAlbumsComponent } from './user-albums.component';

describe('UserAlbumsComponent', () => {
  let component: UserAlbumsComponent;
  let fixture: ComponentFixture<UserAlbumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAlbumsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
