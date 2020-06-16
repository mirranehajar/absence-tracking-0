import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenComponent } from './authen.component';

describe('AuthenComponent', () => {
  let component: AuthenComponent;
  let fixture: ComponentFixture<AuthenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
