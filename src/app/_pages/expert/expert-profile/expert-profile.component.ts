import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {TokenStorageService} from '../../../_services/token-storage/token-storage.service';
import {UserService} from '../../../_services/user/user.service';
import {IExpert} from '../../../_models/models.interface';
import {TranslationService} from '../../../_services/translation/translation.service';
import { UserType } from 'src/app/_models/user.interface';
import {Country} from '../../../_models/country.interface';
import { MainService } from 'src/app/_services/main.service';
import { EncryptionService } from 'src/app/_services/encryption.service';


@Component({
  selector: 'app-expert-profile',
  templateUrl: './expert-profile.component.html',
  styleUrls: ['./expert-profile.component.css']
})
export class ExpertProfileComponent implements OnInit {
  hide = true;
  
  expert: IExpert = {} as IExpert;

  activities: any;

  countries: Country[] = [];
  towns:[string];
  notEdition = true;
  IsInEdition=false;

  expertForm:FormGroup
  passwordForm: FormGroup
  
  isPasswordChange=false;

  constructor(private tokenStorageService: TokenStorageService,
              private translate: TranslationService,
              private http: HttpClient,
              private fb: FormBuilder,
              private mainService: MainService,
              private encryptor: EncryptionService,
              private userService: UserService) {
    this.translate.useActive();
    this.expert = this.tokenStorageService.getUser() as IExpert;

  }

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      oldPassword:['', [Validators.required, Validators.minLength(8)]],
      password:['', [Validators.required, Validators.minLength(8)]],
      confirm_password:['', [Validators.required, Validators.minLength(8)]]
    }, {validator: this.checkPasswords})

    this.expertForm = new FormGroup({
      /** form validators */
        lastname:  new FormControl(this.expert.lastName,[Validators.minLength(2), Validators.required]),
        phoneNumber: new FormControl(this.expert.phoneNumber,[Validators.minLength(8), Validators.required]),
        email: new FormControl(this.expert.email,[Validators.email, Validators.required]),
        nic: new FormControl(this.expert.nic,[Validators.minLength(2), Validators.required]),
        firstname: new FormControl(this.expert.firstName,[Validators.minLength(2), Validators.required]),
        country:  new FormControl(this.expert.country,[Validators.minLength(2), Validators.required]),
        city:  new FormControl(this.expert.city,[Validators.minLength(2), Validators.required]),
        niu:  new FormControl(this.expert.niu,[Validators.minLength(2), Validators.required]),
        company_name:  new FormControl(this.expert.company_name,[Validators.minLength(2), Validators.required]),
        trade_id:  new FormControl(this.expert.trade_id,[Validators.minLength(2), Validators.required]),
        website:  new FormControl(this.expert.website,[Validators.minLength(2), Validators.required]),
        working_place:  new FormControl(this.expert.working_place,[Validators.minLength(2), Validators.required]),
        experience:  new FormControl(this.expert.experience,[Validators.minLength(2), Validators.required]),
        national_order:  new FormControl(this.expert.national_order,[Validators.minLength(2), Validators.required]),
        international_order:  new FormControl(this.expert.international_order,[Validators.minLength(2)]),
        sexe:  new FormControl(this.expert.sexe,[Validators.required]),
        social_reason:  new FormControl(this.expert.social_reason,[Validators.minLength(2), Validators.required]),
        /**end form validators */
    })   
    this.loadActivity();
    this.loadCountries();
  }

  /**
   *
   */

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('confirm_password').value;

    return pass === confirmPass ? null : { notSame: true }     
  }
  
  loadActivity(){

    if(this.translate.getActiveLang() =='fr'){
      this.mainService.getActivities('fr').subscribe((data:any)=>{
       
        data = JSON.parse(JSON.stringify(data))
          this.activities=this.encryptor.decrypt(data.data);
          this.activities = JSON.parse(this.activities)
          this.activities =this.activities.data
      })
    }else{
      this.mainService.getActivities('en').subscribe((data:any)=>{
       
        data = JSON.parse(JSON.stringify(data))
          this.activities=this.encryptor.decrypt(data.data);
          this.activities = JSON.parse(this.activities)
          this.activities =this.activities.data
      })
    }
  }

  getSelectedCountry():string{
    return this.expertForm.get('country').value;
  }
  loadCities(){
    console.log(this.expertForm.get('country').value);
    this.towns = this.countries.find(x=>x.name == this.getSelectedCountry() ).cities;
   }

  loadCountries(){
    if(this.translate.getActiveLang() =='fr'){
      this.http.get("assets/compolsary/countries.min.json").subscribe((data:any)=>{
        data.forEach(element => {
          this.countries.push({name: element.country, cities:element.cities } );
        });
      })
    }else{
      this.http.get("assets/compolsary/countries.min.json").subscribe((data:any)=>{
        data.forEach(element => {
          this.countries.push({name: element.country, cities:element.cities } );
        });
      })
    }
  }

onEdit(){
  this.IsInEdition = true;
  this.notEdition =false;
}

loadData(isCompany){
  if(isCompany == true){
    this.expertForm.setValue({
      lastname:'',
      firstname:'',
      nic:'',
      sexe:'',
      national_order:'',
      international_order:'',
      experience:0,
      company_name:  this.expert.company_name,
      trade_id: this.expert.trade_id,
      email: this.expert.email,
      niu:this.expert.niu,
      phoneNumber: this.expert.phoneNumber,
      country: this.expert.country,
      city: this.expert.city,
      website:  this.expert.website,
      working_place:  this.expert.working_place,
      social_reason:  this.expert.social_reason,
    })
  }else{
    this.expertForm.setValue({
      company_name:'',
      social_reason:'',
      website:'',
      trade_id:'',
      lastname:  this.expert.lastName,
      phoneNumber: this.expert.phoneNumber,
      email: this.expert.email,
      nic:this.expert.nic,
      firstname: this.expert.firstName,
      country: this.expert.country,
      city: this.expert.city,
      sexe:  this.expert.sexe,
      working_place:  this.expert.working_place,
      niu:this.expert.niu,
      national_order:this.expert.national_order,
      international_order:this.expert.international_order,
      experience:this.expert.experience,
      
    })
  }
  
}

  /**
   *
   */
  onSubmit(f): void {
    if(this.expert.isCompany == true){
        delete f.lastname
        delete f.firstname
        delete f.nic
        delete f.sexe
        delete f.experience
        delete f.international_order
        delete f.national_order
        console.log(f);
        
        this.userService.updateExpertCompant(f, this.tokenStorageService.getToken()).subscribe((res:any)=>{
          console.log(res)
          
          const us = JSON.parse(JSON.stringify(res.data)) as IExpert;
          this.tokenStorageService.saveUser(us);
          this.tokenStorageService.saveToken(JSON.parse(JSON.stringify(res)).token)
          this.expert = us
          this.loadData(this.expert.isCompany);
        })
        this.IsInEdition = false;
      this.notEdition =true;
    }
    else{
      delete f.company_name
      delete f.company_activity
      delete f.social_reason
      delete f.trade_id
      delete f.website
      console.log(f);
      
      this.userService.updateExpert(f, this.tokenStorageService.getToken()).subscribe((res:any)=>{
        console.log(res)
          const us = JSON.parse(JSON.stringify(res.data)) as IExpert;
          this.tokenStorageService.saveUser(us);
          this.tokenStorageService.saveToken(JSON.parse(JSON.stringify(res)).token)
          this.expert = us
          this.loadData(this.expert.isCompany);
      })
      this.IsInEdition = false;
    this.notEdition =true;
    }
    
  }

  /**
   * Tells if the current user has an avatar.
   */
  hasAvatar(): boolean {
    return (this.expert.avatar != null) || (this.expert.avatar != null);
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
          this.expert.avatar = inputNode.files[0];
          this.expert.avatar = inputNode.files[0];
          //$('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
      };

      reader.readAsDataURL(inputNode.files[0]);
    }
  }

  /**
   * [disabled]="!susbriberForm.valid"
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
  changePassword(f){
    const obj = JSON.parse(JSON.stringify({
      'oldPassword': f.oldPassword,
      'password': f.confirm_password
    }))
    this.mainService.editPassword(obj, this.tokenStorageService.getToken()).subscribe((res:Response)=>{
      console.log()
      if(res.status != 403 && res.status != 500){
        console.log('done!!')
        this.onPasswordChange()
      }
      else{
        console.log("something went wrong")
      }
    })
  }
}
