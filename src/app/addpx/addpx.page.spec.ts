import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddpxPage } from './addpx.page';

describe('AddpxPage', () => {
  let component: AddpxPage;
  let fixture: ComponentFixture<AddpxPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddpxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
