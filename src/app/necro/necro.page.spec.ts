import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NecroPage } from './necro.page';

describe('NecroPage', () => {
  let component: NecroPage;
  let fixture: ComponentFixture<NecroPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NecroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
