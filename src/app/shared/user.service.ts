import { Injectable } from '@angular/core';
import { UserInfo } from './user.model';
import { ApplicationsService } from './application/applications.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: UserInfo = {
    id: '',
    sessionToken: ''
  };

  constructor(private http: HttpClient) {

  }

  login(enteredEmail: string, enteredPassword: string)
  {
    // Make request to api
    const url = "https://localhost:7187/api/User/login";
    const params = {
      email: enteredEmail,
      password: enteredPassword
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': '*/*'
    });



    // Retrieve response, if response it good, login with information and retreive user's applications
    this.http.get(url, { headers, params })
      .subscribe(
        response => {
          console.log('login successful', response);
        },
        error => {
          console.error('Error logging in', error);
        }
      );

    // Else display error
  }

  signup(email: string, password: string)
  {
    // Make request to api to make new account

    // Retrieve response, if response it good, login with information

    // Else display error
  }
}
