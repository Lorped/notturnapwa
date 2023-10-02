import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OggettoPage } from './oggetto.page';

describe('OggettoPage', () => {
  let component: OggettoPage;
  let fixture: ComponentFixture<OggettoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OggettoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
