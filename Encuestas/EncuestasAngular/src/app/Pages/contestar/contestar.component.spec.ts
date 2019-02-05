import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestarComponent } from './contestar.component';

describe('ContestarComponent', () => {
  let component: ContestarComponent;
  let fixture: ComponentFixture<ContestarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
