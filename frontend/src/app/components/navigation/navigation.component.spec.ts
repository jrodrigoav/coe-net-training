import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NavigationComponent } from './navigation.component';

const expectedLinks: { route: string, name: string }[] = [
  { route: "/home", name: "Home" },
  { route: "/users", name: "Users" },
  { route: "/albums", name: "Albums" },
  { route: "/test", name: "Test Unicorn API" },
];

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 4 links for navigate', () => {
    const links = el.queryAll(By.css('a.nav-link'));
    expect(links.length).toBe(expectedLinks.length);

    for (let i = 0; i < links.length; i++) {
      expect(links[i].nativeElement.innerText).toBe(expectedLinks[i].name);
      expect(links[i].attributes['routerLink']).toBe(expectedLinks[i].route)
    }
  });

});
