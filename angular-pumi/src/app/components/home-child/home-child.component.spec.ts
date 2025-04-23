import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeChildComponent} from './home-child.component';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';

describe('HomeChildComponent', () => {
  let component: HomeChildComponent;
  let fixture: ComponentFixture<HomeChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [HomeChildComponent, provideHttpClient(), provideHttpClientTesting()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
