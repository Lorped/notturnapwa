import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PoteriPage } from './poteri.page';

describe('PoteriPage', () => {
  let component: PoteriPage;
  let fixture: ComponentFixture<PoteriPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PoteriPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
