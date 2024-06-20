import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './profileMenu/change-password/change-password.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ListTeamsComponent } from './teams/list-teams/list-teams.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { DetailsComponent } from './teams/details/details.component';
import { TeamEditComponent } from './teams/team-edit/team-edit.component';
import { EditProfileComponent } from './profileMenu/editProfile/editProfile.component';

const routes: Routes = [

  {path:'login',
  component:LoginComponent,
},

// { path:'home',
//     component: HomeComponent,
//     pathMatch:'full',
// },

  { path:'users',
    component: ListUsersComponent,
    pathMatch:'full',
    canActivate: [AuthGuard]
  },

  { path:'changepassword',
    component: ChangePasswordComponent,
    pathMatch:"full",
    canActivate: [AuthGuard]
  },

  { path:'editprofile',
    component: EditProfileComponent,
    pathMatch:"full",
    canActivate: [AuthGuard]
  },

  { path:'teams',
    component: ListTeamsComponent,
    pathMatch:"full",
    canActivate: [AuthGuard]
  },

  { path:'teamdetails/:id',
    component: DetailsComponent,
    pathMatch:'full',
    canActivate: [AuthGuard]
  },

  { path:'teamedit/:id',
    component: TeamEditComponent,
    pathMatch:'full',
    canActivate: [AuthGuard]
  },

  { path:'**',
    component: PageNotFoundComponent },
    // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
