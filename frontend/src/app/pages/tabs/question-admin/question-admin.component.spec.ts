import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAdminComponent } from './question-admin.component';

describe('QuestionAdminComponent', () => {
  let component: QuestionAdminComponent;
  let fixture: ComponentFixture<QuestionAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
