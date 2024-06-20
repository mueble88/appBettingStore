// imports angular
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// imports angular material
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule, MatFormFieldControl} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import {CdkTableModule} from '@angular/cdk/table';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';

// imports components module
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar/toolbar.component';
import { LoginComponent } from './login/login.component';
import { ConfirmDeletedUserComponent } from './shared/myModals/confirm-deleted-user/confirm-deleted-user.component';
import { MenuComponent } from './profileMenu/menu/menu.component';
import { LogoutComponent } from './profileMenu/logout/logout.component';
import { ChangePasswordComponent } from './profileMenu/change-password/change-password.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { PopupUserComponent } from './users/popup-user/popup-user.component';
import { ButtonDeleteComponent } from './users/button-delete/button-delete.component';
import { ButtonUpdateComponent } from './users/button-update/button-update.component';
import { ButtonDetailsComponent } from './teams/button-details/button-details.component';
import { ButtonEditComponent } from './teams/button-edit/button-edit.component';
import { ListTeamsComponent } from './teams/list-teams/list-teams.component';
import { AuthService } from './shared/services/auth/auth.service';
import { AuthGuard } from './shared/guards/auth.guard';
import { JwtInterceptorService } from './shared/services/interceptor/jwtInterceptor.service';
import { DetailsComponent } from './teams/details/details.component';
import { PopupTeamDetailsComponent } from './teams/popup-team-details/popup-team-details.component';
import { PopupTeamEditComponent } from './teams/popup-team-edit/popup-team-edit.component';
import { TeamEditComponent } from './teams/team-edit/team-edit.component';
import { PaginatePipe } from './shared/pipes/paginate.pipe';
import { CustomMatPaginatorIntl } from './shared/paginator/paginator-es';
import { EditProfileComponent } from './profileMenu/editProfile/editProfile.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    LoginComponent,
    ConfirmDeletedUserComponent,
    MenuComponent,
    LogoutComponent,
    ChangePasswordComponent,
    PageNotFoundComponent,
    ListUsersComponent,
    PopupUserComponent,
    ButtonDeleteComponent,
    ButtonUpdateComponent,
    ButtonDetailsComponent,
    ButtonEditComponent,
    ListTeamsComponent,
    DetailsComponent,
    PopupTeamDetailsComponent,
    PopupTeamEditComponent,
    TeamEditComponent,
    PaginatePipe,
    EditProfileComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule,
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule,
    MatCardModule,
    CdkTableModule,
    NgxDropzoneModule,
    NgxPaginationModule,
    MatPaginatorModule,
  ],
  entryComponents:[ConfirmDeletedUserComponent],
  providers: [AuthService,AuthGuard,{ provide: HTTP_INTERCEPTORS,
    useClass:JwtInterceptorService,
    multi:true},{provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl}],
  bootstrap: [AppComponent]
})
export class AppModule { }

// how implementation simple-grid-material in app.module.ts in angular?




