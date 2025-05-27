import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Carousel04Component } from './carousel04.component';

describe('Carousel04Component', () => {
  let component: Carousel04Component;
  let fixture: ComponentFixture<Carousel04Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Carousel04Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Carousel04Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
