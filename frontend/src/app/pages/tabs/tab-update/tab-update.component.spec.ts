import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabUpdateComponent } from './tab-update.component';

describe('TabUpdateComponent', () => {
  let component: TabUpdateComponent;
  let fixture: ComponentFixture<TabUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
