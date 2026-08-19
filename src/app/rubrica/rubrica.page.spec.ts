import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RubricaPage } from './rubrica.page';

describe('RubricaPage', () => {
  let component: RubricaPage;
  let fixture: ComponentFixture<RubricaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RubricaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
