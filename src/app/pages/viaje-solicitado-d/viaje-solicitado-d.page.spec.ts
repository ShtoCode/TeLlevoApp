import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViajeSolicitadoDPage } from './viaje-solicitado-d.page';

describe('ViajeSolicitadoDPage', () => {
  let component: ViajeSolicitadoDPage;
  let fixture: ComponentFixture<ViajeSolicitadoDPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViajeSolicitadoDPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViajeSolicitadoDPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
