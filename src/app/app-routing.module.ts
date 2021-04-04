import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthGuard} from './_guards/auth/auth.guard';
import {IsNotAuthGuard} from './_guards/is-not-auth/is-not-auth.guard';
import {IsExpertGuard} from './_guards/is-expert/is-expert.guard';
import {IsNotExpertGuard} from './_guards/is-not-expert/is-not-expert.guard';


import {LoginComponent} from './_pages/login/login.component';
import {RegisterComponent} from './_pages/register/register.component';
import {RecoverPasswordComponent} from './_pages/recover-password/recover-password.component';
import {ExpertLayoutComponent} from './_pages/expert/expert-layout/expert-layout.component';
import {ExpertDashboardComponent} from './_pages/expert/expert-dashboard/expert-dashboard.component';
import {ExpertProfileComponent} from './_pages/expert/expert-profile/expert-profile.component';
import {SubscriberLayoutComponent} from './_pages/subscriber/subscriber-layout/subscriber-layout.component';
import {SubscriberDashboardComponent} from './_pages/subscriber/subscriber-dashboard/subscriber-dashboard.component';
import {SubscriberProfileComponent} from './_pages/subscriber/subscriber-profile/subscriber-profile.component';
import {HomeComponent} from './_pages/home/home.component';
import {SubscriberConsultationsComponent} from './_pages/subscriber/subscriber-consultations/subscriber-consultations.component';
import { SubscriberExpertsComponent } from './_pages/subscriber/subscriber-experts/subscriber-experts.component';
import { SubscriberExpertDetailComponent } from './_pages/subscriber/subscriber-expert-detail/subscriber-expert-detail.component';
import { ConsultationsComponent } from './_pages/expert/consultations/consultations.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [IsNotAuthGuard] },
  { path: 'home', redirectTo: ''},
  { path: 'expert',
    component: ExpertLayoutComponent,
    canActivate: [AuthGuard, IsExpertGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: ExpertDashboardComponent },
      { path: 'profile', component: ExpertProfileComponent },
      { path: 'my-consultations', component: ConsultationsComponent },
    ]
  },
  { path: 'subscriber',
    component: SubscriberLayoutComponent,
    canActivate: [AuthGuard, IsNotExpertGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: SubscriberDashboardComponent },
      { path: 'my-consultations', component: SubscriberConsultationsComponent },
      { path: 'profile', component: SubscriberProfileComponent },
      { path: 'experts', component: SubscriberExpertsComponent },
      { path: 'expert-detail', component: SubscriberExpertDetailComponent },
    ]
  },
  { path: 'login', component: LoginComponent, canActivate: [IsNotAuthGuard] },
  { path: 'logout',  component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [IsNotAuthGuard]  },
  { path: 'recover-password', component: RecoverPasswordComponent, canActivate: [IsNotAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
