import { Component, OnInit } from '@angular/core';
import { SearchResultService } from '../search-result.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private searchResultService: SearchResultService, public auth: AuthenticationService) { }

  ngOnInit(): void {
  }

  resetPage() {
    this.searchResultService.clearData();
  }

}
