import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadAlbumsComponent } from './upload-albums.component';

describe('UploadAlbumsComponent', () => {
  let component: UploadAlbumsComponent;
  let fixture: ComponentFixture<UploadAlbumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadAlbumsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadAlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
