import { Injectable } from '@angular/core';
import { UserInfo } from './user.model';
import { ApplicationsService } from './application/applications.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  public loggedIn$ = this.loggedIn.asObservable();

  private user = new BehaviorSubject<UserInfo>({
    id: 0,
    sessionToken: ''
  });
  public user$ = this.user.asObservable();

  // user: UserInfo = {
  //   id: 0,
  //   sessionToken: ''
  // };

  constructor(private http: HttpClient) {
    // const storedStatus = localStorage.getItem('isLoggedIn');
    // this.loggedIn.next(storedStatus === 'true');
  }

  async login(enteredEmail: string, enteredPassword: string): Promise<boolean>
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

      try {
        const response = await this.http.get<{userId: number, sessionKey: string}>(url, { headers, params }).toPromise()
        // console.log('login successful', response);
        // localStorage.setItem('userId', re);
        const userId = response!.userId;
        const sessionToken = response!.sessionKey;
        // this.user.id = userId;
        // this.user.sessionToken = sessionToken;

        this.user.next({
          id: userId,
          sessionToken: sessionToken
        })
        this.loggedIn.next(true);
        localStorage.setItem('isLoggedIn', 'true'); // Save status
        return true;
      } catch (error) {
        console.error('Error logging in', error);
        return false;
      }
  }

  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }


  signup(email: string, password: string)
  {
    // Make request to api to make new account

    // Retrieve response, if response it good, login with information

    // Else display error
  }

  signOut(): void {
    this.user.next({
      id: 0,
      sessionToken: ''
    })
    this.loggedIn.next(false);

    localStorage.setItem('isLoggedIn', 'false');
  }
}
