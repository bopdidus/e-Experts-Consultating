import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import {TokenStorageService} from '../token-storage/token-storage.service';
import {
  ICompanyPersonalInfos,
  IPersonPersonalInfos
} from '../../_models/models.interface';
import {API_BASE_URL, ROUTE_PATH_TYPES} from '../../_models/constants.interface';
import {UserType} from '../../_models/user.interface';

const rootApiPath = `${API_BASE_URL}/{type}/`;
enum UserActions {
  UPDATE_PERSONAL_INFOS, REGISTER, RESET_PWD
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private tokenStorageService: TokenStorageService) { }

  /**
   *
   * @param infos
   */
  savePersonalInfos(infos: IPersonPersonalInfos|ICompanyPersonalInfos): Observable<any> {
    const {data, url} = this.sanitizeData(infos);
    return this.http.post(`${url}`, infos);
  }

  
  /**
   *
   * @param infos
   */
  savePersonalContactInfos(infos): Observable<any> {
    const {data, url} = this.sanitizeData(infos);
    return this.http.post(`${url}`, infos);
  }

  /**
   *
   * @param infos
   *
  changePassword(infos: IPasswordEditable): Observable<any> {
    const {data, url} = this.sanitizeData(infos);
    return this.http.put(`${url}`, infos);
  }
*/
  private sanitizeData(input): {data: any; url: string; }  {
    const data = JSON.parse(JSON.stringify(input));
    let url = '';

    //const {id, type} = this.tokenStorageService.getUser();

   // data.id = id;
   // url = rootApiPath.replace('{type}', ROUTE_PATH_TYPES[type]);

    return {data, url};
  }

  updateSubscriber(formData, token):Observable<any>{
    httpOptions.headers = httpOptions.headers.set('Authorization', token)
    return this.http.put(`${API_BASE_URL}subscriber/update-profile`, formData, httpOptions);
  }

  updateExpert(formData, token){
    httpOptions.headers = httpOptions.headers.set('Authorization', token)
    return this.http.put(`${API_BASE_URL}expert/update-profile`, formData, httpOptions);
  }
  updateExpertCompant(formData, token){
    httpOptions.headers = httpOptions.headers.set('Authorization', token)
    return this.http.put(`${API_BASE_URL}expert-company/update-profile`, formData, httpOptions);
  }
  
  getExpert(id): Observable<any>{

    return this.http.get(`${API_BASE_URL}expert/${id}`);
  }

}
