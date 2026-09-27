import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', loadComponent: () => import('../app/components/home/home').then(m => m.Home)
    },
    {
        path: 'home', loadComponent: () => import('../app/components/home/home').then(m => m.Home)
    },
    {
        path: 'quran', loadComponent: () => import('../app/components/quran-sound/quran-sound').then(m => m.QuranSound)
    },
    {
        path: 'azkar', loadComponent: () => import('../app/components/anzkar-menu/anzkar-menu').then(m => m.AnzkarMenu)
    },
    {
        path: 'azkarMorning', loadComponent: () => import('../app/components/anzkar-morning/anzkar-morning').then(m => m.AnzkarMorning)
    },
    {
        path: 'azkarEvening', loadComponent: () => import('../app/components/anzkar-evining/anzkar-evining').then(m => m.AnzkarEvining)
    }
    ,
    {
        path: 'liveMenu', loadComponent: () => import('../app/components/live-menu/live-menu').then(m => m.LiveMenu)
    }
];