import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StreetViewPage } from './street-view.page';

describe('StreetViewPage', () => {
  let component: StreetViewPage;
  let fixture: ComponentFixture<StreetViewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(StreetViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
