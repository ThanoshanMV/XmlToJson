import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XmlContentComponent } from './xml-content.component';

describe('XmlContentComponent', () => {
  let component: XmlContentComponent;
  let fixture: ComponentFixture<XmlContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XmlContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XmlContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
