import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsHomeComponent } from './tabs-home.component';

describe('TabsHomeComponent', () => {
  let component: TabsHomeComponent;
  let fixture: ComponentFixture<TabsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabsHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
