import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaumPage } from './taum.page';

describe('TaumPage', () => {
  let component: TaumPage;
  let fixture: ComponentFixture<TaumPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TaumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
