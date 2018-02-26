/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GestionProductosService } from './gestion-productos.service';

describe('GestionProductosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GestionProductosService]
    });
  });

  it('should ...', inject([GestionProductosService], (service: GestionProductosService) => {
    expect(service).toBeTruthy();
  }));
});
