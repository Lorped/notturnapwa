import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FocusattrPage } from './focusattr.page';

describe('FocusattrPage', () => {
  let component: FocusattrPage;
  let fixture: ComponentFixture<FocusattrPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FocusattrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
