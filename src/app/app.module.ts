import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { JwtModule } from '@auth0/angular-jwt';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { UserService } from './_services/user.service';
import { AuthGuard } from './_guards/auth.guard';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { MemberPhotosComponent } from './members/member-photos/member-photos.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AuthModule } from './auth/auth.module';
import { ProfileResolver } from './_resolvers/profile.resolver';
import { ProfileModule } from './profile/profile.module';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileEditResolver } from './_resolvers/profile-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { AlertifyService } from './_services/alertify.service';
import { CommonModule } from '@angular/common';
import { HomeLeftSidebarComponent } from './pages/home-page/home-left-sidebar/home-left-sidebar.component';

export function tokenGetter(){
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [									
    AppComponent,
    HomeComponent,
    MemberListComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberPhotosComponent,
    MessagesComponent,
    ListsComponent,
    ProfileEditComponent,
    HomeLeftSidebarComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule,
    ProfileModule,
    CommonModule,
    CoreModule,
    FormsModule,
    TabsModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:5001'],
        disallowedRoutes: ['localhost:5001/api/account']
      }
    })
  ],
  exports: [RouterModule],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    AlertifyService,
    AuthGuard,
    PreventUnsavedChanges,
    UserService,
    MemberDetailResolver,
    MemberListResolver,
    ProfileResolver,
    ProfileEditResolver,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
