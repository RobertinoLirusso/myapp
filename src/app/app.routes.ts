import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ClubComponent } from './club/club.component';
import { DetailsComponent } from './details/details.component';
import { authGuard } from './login/auth.guard';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {
        path: '',
        component: ClubComponent,
        title: 'Football Clubs Corner'
    },
    {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'Club Info'    
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Admin',
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [authGuard],
        title: 'Control Panel'
    }
];
