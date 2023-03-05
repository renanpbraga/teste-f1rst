import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserDto } from './utils/dto/user-dto';
import { UserInput } from './utils/inputs/user.input';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  public currentUser = new BehaviorSubject<any>(undefined);
  constructor(private readonly http: HttpClient) {}

  findUser() {
    return this.http.get(`http://localhost:3000/users`);
  }

  findRegistry() {
    return this.http.get(`http://localhost:3000/registry`);
  }

  preRegisterUser(userInput: UserInput) {
    return this.http.post(`http://localhost:3000/users`, userInput);
  }

  getAddress(zipcode: string) {
    return this.http.get(`https://viacep.com.br/ws/${zipcode}/json/`);
  }

  saveUserOnStorage(user: UserDto) {
    localStorage.setItem('mock-user', JSON.stringify(user));
  }

  getUserFromStorage() {
    const user = localStorage.getItem('mock-user');
    if (user) {
      this.currentUser.next(JSON.parse(user));
    }
  }
}
