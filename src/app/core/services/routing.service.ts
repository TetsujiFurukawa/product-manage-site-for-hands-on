import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  constructor(public router: Router) {}

  /**
   * Navigates to path.
   * @param path path to pages.
   */
  public navigate(path: string) {
    // navigates to path.
    this.router.navigate(['/' + path]);
  }
}
