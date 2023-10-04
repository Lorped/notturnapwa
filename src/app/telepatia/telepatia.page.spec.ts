import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TelepatiaPage } from './telepatia.page';

describe('TelepatiaPage', () => {
  let component: TelepatiaPage;
  let fixture: ComponentFixture<TelepatiaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TelepatiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
