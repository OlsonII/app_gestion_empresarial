import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsInAndOutComponent } from './products-in-and-out.component';

describe('ProductsInAndOutComponent', () => {
  let component: ProductsInAndOutComponent;
  let fixture: ComponentFixture<ProductsInAndOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsInAndOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsInAndOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
