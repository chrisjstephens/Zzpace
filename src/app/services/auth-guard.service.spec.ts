import { TestBed } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';

  describe('AuthGuardService', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
         HttpClientTestingModule,  StoreModule.forRoot({})
        ],
        providers: [AuthGuardService]
      });
    });

  it('should be created', () => {
    const service: AuthGuardService = TestBed.get(AuthGuardService);
    expect(service).toBeTruthy();
  });
});
