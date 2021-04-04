import { Component, OnInit } from '@angular/core';
import {User} from '../../../_models/user.interface';
import { HttpClient } from '@angular/common/http';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {TokenStorageService} from '../../../_services/token-storage/token-storage.service';
import {ISubscriber} from '../../../_models/models.interface';

import {UserService} from '../../../_services/user/user.service';
import {Country} from '../../../_models/country.interface';


import {TranslationService} from '../../../_services/translation/translation.service';

@Component({
  selector: 'app-subscriber-profile',
  templateUrl: './subscriber-profile.component.html',
  styleUrls: ['./subscriber-profile.component.css']
})
export class SubscriberProfileComponent implements OnInit {
  
  hide = true;
  
  subscriber: ISubscriber = {} as ISubscriber;

  activities: any;

  countries: Country[] = [];
  towns:[string];
  notEdition = true;
  IsInEdition=false;

  susbriberForm:FormGroup
  
  isPasswordChange=false;

  constructor(private tokenStorageService: TokenStorageService,
              private translate: TranslationService,
              private http: HttpClient,
              private userService: UserService) {

         
    // Use active lang
    this.translate.useActive();

    // Get logged user from app storage
    this.subscriber = this.tokenStorageService.getUser();
    // Set current view user type
    // this.type = us.type;

    
  }

  ngOnInit(): void {
    this.susbriberForm = new FormGroup({
      /** form validators */
        lastname:  new FormControl(this.subscriber.lastName,[Validators.minLength(2), Validators.required]),
        phoneNumber: new FormControl(this.subscriber.phoneNumber,[Validators.minLength(8), Validators.required]),
        email: new FormControl(this.subscriber.email,[Validators.email, Validators.required]),
        nic: new FormControl(this.subscriber.nic,[Validators.minLength(2), Validators.required]),
        firstname: new FormControl(this.subscriber.firstName,[Validators.minLength(2), Validators.required]),
        country:  new FormControl(this.subscriber.country,[Validators.minLength(2), Validators.required]),
        city:  new FormControl(this.subscriber.city,[Validators.minLength(2), Validators.required]),
        niu:  new FormControl('',[Validators.minLength(2), Validators.required]),
        company_activity:  new FormControl('',[Validators.minLength(2), Validators.required]),
        company_name:  new FormControl('',[Validators.minLength(2), Validators.required]),
        social_reason:  new FormControl('',[Validators.minLength(2), Validators.required]),
        sexe:  new FormControl(this.subscriber.sexe,[Validators.minLength(2), Validators.required]),
        /**end form validators */
    })   
    // Load data from server and apply them to view data and original view data
    //this.originalCompany = JSON.parse(JSON.stringify(this.company));
    ///this.originalPerson = JSON.parse(JSON.stringify(this.person));
    console.log(this.subscriber)
    this.loadActivity();
    this.loadCountries();
  }
  cancelEdition(){
    this.IsInEdition = false;
    this.notEdition =true;
  }
  loadData(){
    this.susbriberForm.setValue({
      lastname:  this.subscriber.lastName,
      phoneNumber: this.subscriber.phoneNumber,
      email: this.subscriber.email,
      nic:this.subscriber.nic,
      firstname: this.subscriber.firstName,
      country: this.subscriber.country,
      city: this.subscriber.city,
      sexe:  this.subscriber.sexe
    })
  }

  
  loadActivity(){

    if(this.translate.getActiveLang() =='fr'){
      this.http.get("assets/compolsary/activities_fr.json").subscribe((data:any)=>{
        this.activities = data;
      })
    }else{
      this.http.get("assets/compolsary/activities_en.json").subscribe((data:any)=>{
        this.activities = data;
      })
    }
  }

  loadCountries(){
    this.http.get("assets/compolsary/countries.min.json").subscribe((data:any)=>{
      data.forEach(element => {
        this.countries.push({name: element.country, cities:element.cities } );
      });

    })
}
getSelectedCountry():string{
  return this.susbriberForm.get('country').value;
}

loadCities(){
  console.log(this.susbriberForm.get('country').value);
  this.towns = this.countries.find(x=>x.name == this.getSelectedCountry() ).cities;
 }

onEdit(){
  this.IsInEdition = true;
  this.notEdition =false;
}

  /**
   *
   */
  onSubmit(f): void {
    delete f.niu
    delete f.company_name
    delete f.company_activity
    delete f.social_reason
    console.log(f);
    
    this.userService.updateSubscriber(f, this.tokenStorageService.getToken()).subscribe(res=>{
      console.log(res)
      
      const us = JSON.parse(JSON.stringify(res)) as User;
      this.tokenStorageService.saveUser(us);
      this.subscriber = this.tokenStorageService.getUser();
      this.loadData();
    })
    this.IsInEdition = false;
  this.notEdition =true;
  
  }

  /**
   * Tells if the current user has an avatar.
   */
  hasAvatar(): boolean {
    return (this.subscriber.avatar != null) || (this.subscriber.avatar != null);
  }

  /**
   * Handles avatar selection changes.
   */
  onFileSelected(): void {
    if (typeof (FileReader) !== 'undefined') {
      const inputNode: any = document.querySelector('#imagePicker');
      const reader = new FileReader();

      reader.onload = (e: any) => {
          console.log(e.target.result);
          this.subscriber.avatar = inputNode.files[0];
          this.subscriber.avatar = inputNode.files[0];
         // $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
      };

      reader.readAsDataURL(inputNode.files[0]);
    }
  }

  /**
   * Reset view data while canceling the edition.
   */
  cancelEditionClicked(): void {
    this.IsInEdition = false;
    //this.company = JSON.parse(JSON.stringify(this.originalCompany));
    //this.person = JSON.parse(JSON.stringify(this.originalPerson));
  }

  onPasswordChange(){
    this.isPasswordChange = !this.isPasswordChange;
  }
}
