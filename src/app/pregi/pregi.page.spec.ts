import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PregiPage } from './pregi.page';

describe('PregiPage', () => {
  let component: PregiPage;
  let fixture: ComponentFixture<PregiPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PregiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
