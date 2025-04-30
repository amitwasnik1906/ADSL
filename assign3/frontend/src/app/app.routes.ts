import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent : ()=>{
            return import('./pages/home/home.component').then((m) => m.HomeComponent)
        }
    },
    {
        path: 'login',
        loadComponent : ()=>{
            return import('./pages/login-page/login-page.component').then((m) => m.LoginPageComponent)
        }
    },
    {
        path: 'register',
        loadComponent : ()=>{
            return import('./pages/register-page/register-page.component').then((m) => m.RegisterPageComponent)
        }
    }
];
