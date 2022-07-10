import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICity } from '../_models/city';
import { IGender } from '../_models/gender';
import { IRegion } from '../_models/region';
import { IStatus } from '../_models/status';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users');
  }

  getUser(id: any): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }

  updateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + 'users/' + id, user);
  }

  getRegions(): Observable<IRegion[]> {
    return this.http.get<IRegion[]>(this.baseUrl + 'usersettings/regions');
  }

  getRegion(id: number): Observable<IRegion> {
    return this.http.get<IRegion>(this.baseUrl + 'usersettings/regions/' + id);
  }

  getCities(): Observable<ICity[]> {
    return this.http.get<ICity[]>(this.baseUrl + 'usersettings/cities');
  }

  getCity(id: number): Observable<ICity> {
    return this.http.get<ICity>(this.baseUrl + 'usersettings/cities/' + id);
  }

  getGenders(): Observable<IGender[]> {
    return this.http.get<IGender[]>(this.baseUrl + 'usersettings/genders');
  }

  getGender(id: number): Observable<IGender> {
    return this.http.get<IGender>(this.baseUrl + 'usersettings/genders/' + id);
  }
  
  getStatuses(): Observable<IStatus[]> {
    return this.http.get<IStatus[]>(this.baseUrl + 'usersettings/statuses');
  }

  getStatus(id: number): Observable<IStatus> {
    return this.http.get<IStatus>(this.baseUrl + 'usersettings/statuses/' + id);
  }

  setMainPhoto(userId: number, id: number) {
    return this.http.post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {});
  }

  deletePhoto(userId: number, id: number) {
    return this.http.delete(this.baseUrl + 'users/' + userId + '/photos/' + id);
  }
}
