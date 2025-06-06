import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WhyComponent } from './why.component';

describe('WhyComponent', () => {
  let component: WhyComponent;
  let fixture: ComponentFixture<WhyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhyComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(WhyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
