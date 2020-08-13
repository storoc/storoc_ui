import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  apiUrl: string = 'https://storoc.live/api/store_max';
  apiUrlAppended: string;
  place_id: string = "";

  details: UserDetails;
  maxOccupancy: number;

  constructor(private auth: AuthenticationService, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.auth.profile().subscribe(user => {
      this.details = user;
    }, (err) => {
      console.error(err);
    });
  }

  updateCapacity() {
    this.apiUrlAppended = this.apiUrl + '?unique_id=' + this.place_id;
    console.log('made api call to ', this.apiUrlAppended);
    return this.httpClient.post(this.apiUrlAppended, this.maxOccupancy);
  }
}
