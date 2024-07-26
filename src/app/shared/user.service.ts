import { Injectable } from '@angular/core';
import { UserInfo } from './user.model';
import { ApplicationsService } from './application/applications.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: UserInfo = {
    id: ''
  };

  login(email: string, password: string)
  {
    // Make request to api

    // Retrieve response, if response it good, login with information and retreive user's applications

    // Else display error
  }

  signup(email: string, password: string)
  {
    // Make request to api to make new account

    // Retrieve response, if response it good, login with information

    // Else display error
  }
}
