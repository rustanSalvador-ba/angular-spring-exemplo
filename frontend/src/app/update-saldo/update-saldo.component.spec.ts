import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSaldoComponent } from './update-saldo.component';

describe('UpdateSaldoComponent', () => {
  let component: UpdateSaldoComponent;
  let fixture: ComponentFixture<UpdateSaldoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSaldoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSaldoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
