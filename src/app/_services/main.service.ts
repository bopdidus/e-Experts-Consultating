import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {API_BASE_URL, ROUTE_PATH_TYPES} from '../_models/constants.interface';
import { EncryptionService } from './encryption.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient, private encryptor: EncryptionService) { }

  loadExperts(lang){
     return this.http.get(`${API_BASE_URL}domain/${lang}`)
  }
  getExpertsforDomain(id){
    return this.http.get(`${API_BASE_URL}activity/${id}`)
  }

  getActivities(lang){
    lang = this.encryptor.encrypt(lang);
    return this.http.get(`${API_BASE_URL}domain?lang=${lang}`)
  }

  getConsultations(){
    return this.http.get(`${API_BASE_URL}consultation`)
  }

  editPassword(obj:any, token){
    httpOptions.headers = httpOptions.headers.set('Authorization', token)
    return this.http.put(`${API_BASE_URL}expert/change-password`, obj)
  }
}
