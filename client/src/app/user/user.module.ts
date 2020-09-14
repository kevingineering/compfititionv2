import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from './user-page/user-page.component';
import { UserDeleteModuleComponent } from './user-page/user-delete-module/user-delete-module.component';
import { UserEditModuleComponent } from './user-page/user-edit-module/user-edit-module.component';
import { UserPasswordModuleComponent } from './user-page/user-password-module/user-password-module.component';
import { UserInfoComponent } from './user-page/user-info/user-info.component';

@NgModule({
  declarations: [
    UserPageComponent,
    UserDeleteModuleComponent,
    UserEditModuleComponent,
    UserPasswordModuleComponent,
    UserInfoComponent,
  ],
  imports: [CommonModule],
  exports: [],
})
export class UserModule {}
