import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabCreateComponent } from './tab-create.component';

describe('TabCreateComponent', () => {
  let component: TabCreateComponent;
  let fixture: ComponentFixture<TabCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
