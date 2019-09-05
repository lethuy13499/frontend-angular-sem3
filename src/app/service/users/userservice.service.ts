import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/model/user/users';
import { Constant } from 'src/app/common/constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private http: HttpClient) { }
  getAllUser(): Observable<any>{
    return this.http.get<Object>(Constant.API_GET_ALL_USER)
  }
  createUserRegister(user:User){
  return this.http.post<User>(Constant.API_ADD_USER,user)
  }
  updateUser(UserId:number,data:Partial<User>){
    return this.http.post<User>(Constant.API_UPDATE_USER+'/'+ UserId,data,)
  }
  deleteUserById(UserId:number){
  const test=this.http.delete<User>(Constant.API_GET_DELETE_USER +'/'+ UserId,null)
  return test;
  }
  createUser(formData: FormData) : Observable<any>{
    return this.http.post(Constant.API_ADD_USER, formData);
  }
  
}
