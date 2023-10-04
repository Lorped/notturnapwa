import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangecontattoPage } from './changecontatto.page';

describe('ChangecontattoPage', () => {
  let component: ChangecontattoPage;
  let fixture: ComponentFixture<ChangecontattoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ChangecontattoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
