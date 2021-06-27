import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonContentComponent } from './json-content.component';

describe('JsonContentComponent', () => {
  let component: JsonContentComponent;
  let fixture: ComponentFixture<JsonContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsonContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
