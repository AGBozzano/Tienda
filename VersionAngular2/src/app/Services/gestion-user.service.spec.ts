/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GestionUserService } from './gestion-user.service';

describe('GestionUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GestionUserService]
    });
  });

  it('should ...', inject([GestionUserService], (service: GestionUserService) => {
    expect(service).toBeTruthy();
  }));
});
