import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestUnicornApiComponent } from './test-unicorn-api.component';

describe('TestComponent', () => {
  let component: TestUnicornApiComponent;
  let fixture: ComponentFixture<TestUnicornApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestUnicornApiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestUnicornApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
