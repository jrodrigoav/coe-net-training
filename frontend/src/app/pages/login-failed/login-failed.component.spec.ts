import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LoginFailedComponent } from './login-failed.component';

const LOGIN_FAILED_MSG = 'Login failed. Please try again.';

describe('LoginFailedComponent', () => {
  let component: LoginFailedComponent;
  let fixture: ComponentFixture<LoginFailedComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginFailedComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginFailedComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display not found message', () => {
    const msg = el.query(By.css('p'));
    expect(msg.nativeElement.textContent).toBe(LOGIN_FAILED_MSG);
  });

});
