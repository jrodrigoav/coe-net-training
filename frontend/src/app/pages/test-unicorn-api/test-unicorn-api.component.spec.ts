import { DebugElement, } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { UnicornRewardsApiService } from 'src/app/services/unicorn-rewards-api.service';

import { TestUnicornApiComponent } from './test-unicorn-api.component';

describe('TestUnicornApiComponent', () => {
  let component: TestUnicornApiComponent;
  let fixture: ComponentFixture<TestUnicornApiComponent>;
  let el: DebugElement;

  let unicornApiServiceSpy: any;

  beforeEach(async () => {

    unicornApiServiceSpy = jasmine.createSpyObj('UnicornRewardsApiService', ['test']);
    unicornApiServiceSpy.test.and.returnValue(of({ Message: "TEST" }));

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        TestUnicornApiComponent
      ],
      providers: [
        { provide: UnicornRewardsApiService, useValue: unicornApiServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestUnicornApiComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call test service when button clicked', () => {

    const button = el.query(By.css('button.btn.btn-primary'));
    expect(button).toBeTruthy();

    button.nativeElement.click();
    fixture.detectChanges();

    expect(unicornApiServiceSpy.test.calls.count()).toBe(1);
  });

});
