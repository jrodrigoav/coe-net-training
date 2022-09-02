import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabAdminComponent } from './tab-admin.component';

describe('TabAdminComponent', () => {
  let component: TabAdminComponent;
  let fixture: ComponentFixture<TabAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
