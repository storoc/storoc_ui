import { Component, OnInit } from '@angular/core';
import { SearchResultService } from '../search-result.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private searchResultService: SearchResultService) { }

  ngOnInit(): void {
  }

  resetPage() {
    this.searchResultService.clearData();
  }

}
