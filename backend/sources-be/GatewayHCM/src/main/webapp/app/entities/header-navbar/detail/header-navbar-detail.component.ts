import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHeaderNavbar } from '../header-navbar.model';

@Component({
  selector: 'jhi-header-navbar-detail',
  templateUrl: './header-navbar-detail.component.html',
})
export class HeaderNavbarDetailComponent implements OnInit {
  headerNavbar: IHeaderNavbar | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ headerNavbar }) => {
      this.headerNavbar = headerNavbar;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
