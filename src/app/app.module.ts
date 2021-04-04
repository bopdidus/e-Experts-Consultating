import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { authInterceptorProviders } from './_interceptors/jwt_auth.interceptor';

import {MatStepperModule} from '@angular/material/stepper';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import {MatBadgeModule} from '@angular/material/badge';
import  {MatGridListModule} from '@angular/material/grid-list';
import  {MatSnackBarModule} from '@angular/material/snack-bar';

import { LoginComponent } from './_pages/login/login.component';
import { RecoverPasswordComponent } from './_pages/recover-password/recover-password.component';
import { RegisterComponent } from './_pages/register/register.component';
import { ExpertLayoutComponent } from './_pages/expert/expert-layout/expert-layout.component';
import { ExpertDashboardComponent } from './_pages/expert/expert-dashboard/expert-dashboard.component';
import { ExpertProfileComponent } from './_pages/expert/expert-profile/expert-profile.component';
import { SubscriberProfileComponent } from './_pages/subscriber/subscriber-profile/subscriber-profile.component';
import { SubscriberLayoutComponent } from './_pages/subscriber/subscriber-layout/subscriber-layout.component';
import { SubscriberDashboardComponent } from './_pages/subscriber/subscriber-dashboard/subscriber-dashboard.component';
import { HomeComponent } from './_pages/home/home.component';
import { SubscriberConsultationsComponent } from './_pages/subscriber/subscriber-consultations/subscriber-consultations.component';
import { SubscriberExpertsComponent } from './_pages/subscriber/subscriber-experts/subscriber-experts.component';
import { RatingModule } from 'ng-starrating';
import { ConsultationsComponent } from './_pages/expert/consultations/consultations.component';
import { SubscriberExpertDetailComponent } from './_pages/subscriber/subscriber-expert-detail/subscriber-expert-detail.component';
import { SpeicalPipePipe } from './_helpers/speical-pipe.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RecoverPasswordComponent,
    ExpertLayoutComponent,
    ExpertDashboardComponent,
    ExpertProfileComponent,
    SubscriberProfileComponent,
    SubscriberLayoutComponent,
    SubscriberDashboardComponent,
    HomeComponent,
    SubscriberConsultationsComponent,
    SubscriberExpertsComponent,
    ConsultationsComponent,
    SubscriberExpertDetailComponent,
    SpeicalPipePipe,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ReactiveFormsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    MatRadioModule,
    MatCheckboxModule,
    MatStepperModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatMenuModule,
    MatBadgeModule,
    MatGridListModule,
    MatSnackBarModule,
    RatingModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

