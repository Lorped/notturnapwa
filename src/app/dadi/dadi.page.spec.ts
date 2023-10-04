import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DadiPage } from './dadi.page';

describe('DadiPage', () => {
  let component: DadiPage;
  let fixture: ComponentFixture<DadiPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DadiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
