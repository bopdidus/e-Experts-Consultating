import { Component, OnInit, AfterContentInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import { map } from 'rxjs/operators';

import {TokenStorageService} from '../../_services/token-storage/token-storage.service';
import {AuthService} from '../../_services/auth/auth.service';
import {CString} from '../../_helpers/cstring.class';
import {UserRegisterVm, UserRegisterableTypes} from '../../_models/_view-models/user-register-vm.interface';
import {UserType} from '../../_models/user.interface';
import {Country} from '../../_models/country.interface';
import {TranslationService} from '../../_services/translation/translation.service';
import { MainService } from 'src/app/_services/main.service';
import { EncryptionService } from 'src/app/_services/encryption.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterContentInit {

  form: UserRegisterVm = {} as UserRegisterVm;
  hasError = false;
  loading = false;
  errorMessage = '';
  roles = UserRegisterableTypes;
  userRoles = UserType;

  activities:any;

  countries: Country[] = [];
  towns:[string];

  formSteps: FormGroup;

  constructor(
    private tokenStorage: TokenStorageService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private translate: TranslationService,
    private router: Router,
    private mainService: MainService,
    private encryptor: EncryptionService,
    private http: HttpClient) {
    this.translate.useActive();
    this.form.type = this.roles[0].key;
  }

  ngOnInit(): void {
    this.formSteps = new FormGroup({
        lastname: new FormControl(this.form.lastname, Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()]+$/)])),
        firstname: new FormControl(this.form.firstname, Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()]+$/)])),
        company_name: new FormControl(this.form.company_name, Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[a-zA-Z0-9!@#$%^=+&*()]+$/)])),
        nic: new FormControl(this.form.nic, Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()]+$/)])),
        email: new FormControl(this.form.email, Validators.compose([Validators.required, Validators.email])),
        phoneNumber: new FormControl(this.form.phoneNumber, Validators.compose([Validators.required, Validators.minLength(9)])),
        password: new FormControl(this.form.password, Validators.compose([Validators.required, Validators.minLength(8)])),
        confirm_password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)])),
        sexe: new FormControl(this.form.sexe, Validators.compose([Validators.required])),
        social_reason: new FormControl(this.form.social_reason, Validators.compose([Validators.required, Validators.maxLength(8)])),
        trade_id: new FormControl(this.form.trade_id, Validators.compose([Validators.required,  Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()]+$/)])),
        niu: new FormControl(this.form.niu, Validators.compose([Validators.required,  Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()]+$/)])),
        working_place: new FormControl(this.form.working_place, Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()]+$/)])),
        company_activity: new FormControl(this.form.working_place, Validators.compose([Validators.required])),
        country: new FormControl(this.form.working_place, Validators.compose([Validators.required])),
        type: new FormControl(this.form.type, Validators.compose([Validators.required])),
        experience: new FormControl(this.form.experience, Validators.compose([Validators.required])),
        accept_conditions: new FormControl(this.form.accept_conditions, Validators.compose([Validators.required])),
        city: new FormControl(this.form.working_place, Validators.compose([Validators.required,  Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()]+$/)])),
        national_order: new FormControl(this.form.national_order, Validators.compose([Validators.required,  Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()]+$/)])),
        international_order: new FormControl(this.form.international_order, Validators.compose([Validators.required,  Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()]+$/)])),
      });

    this.loadActivity();
    this.loadCountries();
  }

  ngAfterContentInit(): void {
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
  
  decryption(){
    console.info(this.activities)
     
  }

  getSelectedCountry(){
   console.log(this.formSteps.get('country').value);
   this.towns = this.countries.find(x=>x.name == this.formSteps.get('country').value).cities;
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

  submit(f): void {
    switch (this.formSteps.get('country').value) {
      case UserType.COMPANY_EXPERT:
        if (CString.isNullOrWhiteSpace(this.formSteps.get('company_name').value) ||
          CString.isNullOrWhiteSpace(this.formSteps.get('company_activity').value + '') ||
          CString.isNullOrWhiteSpace(this.formSteps.get('city').value + '')) {
          this.showError('register.requiredFields');
          return;
        }
        break;

      case UserType.EXPERT:
        if (CString.isNullOrWhiteSpace(this.formSteps.get('experience').value + '')) {
          this.showError('register.requiredFields');
          return;
        }

        if (this.formSteps.get('experience').value <= 0) {
          this.showError('register.invalidExperiences');
          return;
        }

      // tslint:disable-next-line:no-switch-case-fall-through
      case UserType.SUBSCRIBER:
        if (CString.isNullOrWhiteSpace(this.formSteps.get('lastname').value) ||
          CString.isNullOrWhiteSpace(this.formSteps.get('firstname').value) ||
          CString.isNullOrWhiteSpace(this.formSteps.get('nic').value)) {
          this.showError('register.requiredFields');
          return;
        }
        break;

      default: this.showError('invalid');
    }

    if (CString.isNullOrWhiteSpace(this.formSteps.get('password').value) ||
      CString.isNullOrWhiteSpace(this.formSteps.get('confirm_password').value)) {
      this.showError('login.requiredFields');
      return;
    }

    if (!CString.IsValidPassword(this.formSteps.get('password').value)) {
      this.showError('register.password_format');
      //return;
    }

    if (this.formSteps.get('password').value !== this.formSteps.get('confirm_password').value) {
      this.showError('register.passwords_missmatch');
      return;
    }

    if (!this.formSteps.get('accept_conditions').value) {
      this.showError('register.accept_conditions_required');
      return;
    }
    if(f.national_order == null){
      f.national_order=""
    }
    if(f.international_order == null){
      f.international_order =""
    }
    this.loading = true;

    this.authService.register(f).subscribe(
      data => {
        this.loading = false;
        console.log(data);
        this.router.navigate(['login'], {  state: {type: this.formSteps.get('type').value} });
      },
      err => {
        this.showError(err.message);
        console.log(err);
      }
    );
  }
/*
  uploadFile(imageInput: any){
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      document.getElementById('imageBack').style.backgroundImage = "url(" + reader.result + ")";
    });
    if(file){
      reader.readAsDataURL(file);
    }
  } <button  mat-button mat-raised-button color="orange" style="position: static;" (click)="clickedButton()">
            <input #imageInput type="file" id="avatar" accept="image/*" (change)="uploadFile(imageInput)" [(ngModel)]="form.avatar" #photo="ngModel" />
            <mat-icon matPrefix class="text-orange">download</mat-icon>downlaod
          </button>

  clickedButton(){
    document.getElementById("avatar").click();
  }
*/
  showError(ressource: string): void {
    this.hasError = true;
    this.loading = false;
    this.errorMessage = ressource;
    setTimeout(() => { this.hasError = false; }, 5000);
  }


}
