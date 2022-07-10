import { Routes } from "@angular/router";
import { NotFoundComponent } from "./core/not-found/not-found.component";
import { ServerErrorComponent } from "./core/server-error/server-error.component";
import { HomeComponent } from "./home/home.component";
import { ListsComponent } from "./lists/lists.component";
import { MemberListComponent } from "./members/member-list/member-list.component";
import { MessagesComponent } from "./messages/messages.component";
import { ProfileAboutComponent } from "./profile/profile-about/profile-about.component";
import { ProfileActivityComponent } from "./profile/profile-activity/profile-activity.component";
import { ProfileConnectionsComponent } from "./profile/profile-connections/profile-connections.component";
import { ProfileDetailComponent } from "./profile/profile-detail/profile-detail.component";
import { ProfileEditComponent } from "./profile-edit/profile-edit.component";
import { ProfileEventsComponent } from "./profile/profile-events/profile-events.component";
import { ProfilePhotosComponent } from "./profile/profile-photos/profile-photos.component";
import { ProfilePostComponent } from "./profile/profile-post/profile-post.component";
import { ProfileVideosComponent } from "./profile/profile-videos/profile-videos.component";
import { AuthGuard } from "./_guards/auth.guard";
import { MemberListResolver } from "./_resolvers/member-list.resolver";
import { ProfileResolver } from "./_resolvers/profile.resolver";
import { ProfileEditResolver } from "./_resolvers/profile-edit.resolver";
import { PreventUnsavedChanges } from "./_guards/prevent-unsaved-changes.guard";
import { PhotoEditorComponent } from "./profile/photo-editor/photo-editor.component";

const profileRoutes: Routes = [
  { path: '', component: ProfilePostComponent },
  { path: 'about', component: ProfileAboutComponent },
  { path: 'connections', component: ProfileConnectionsComponent },
  { path: 'photos', component: ProfilePhotosComponent },
  { path: 'videos', component: ProfileVideosComponent },
  { path: 'events', component: ProfileEventsComponent },
  { path: 'activity', component: ProfileActivityComponent }
];

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'not-found', component: NotFoundComponent },
      { path: 'server-error', component: ServerErrorComponent },
      { path: 'profile', component: ProfileDetailComponent, resolve: { user: ProfileEditResolver }, children: profileRoutes },
      { path: 'profile/:id', component: ProfileDetailComponent, resolve: { user: ProfileResolver }, children: profileRoutes },
      { path: 'profile/photo/edit', component: PhotoEditorComponent, resolve: { user: ProfileEditResolver } },
      { path: 'settings', component: ProfileEditComponent, resolve: { user: ProfileEditResolver }, canDeactivate: [PreventUnsavedChanges] },
      { path: 'members', component: MemberListComponent, resolve: { users: MemberListResolver } },
      { path: 'messages', component: MessagesComponent },
      { path: 'lists', component: ListsComponent },
    ]
  },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
];
