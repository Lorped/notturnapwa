import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },

  {
    path: 'rubrica',
    loadChildren: () =>
      import('./rubrica/rubrica.module').then((m) => m.RubricaPageModule),
  },
  {
    path: 'background',
    loadChildren: () =>
      import('./background/background.module').then(
        (m) => m.BackgroundPageModule
      ),
  },
  {
    path: 'pregi',
    loadChildren: () =>
      import('./pregi/pregi.module').then((m) => m.PregiPageModule),
  },
  {
    path: 'focusattr',
    loadChildren: () =>
      import('./focusattr/focusattr.module').then((m) => m.FocusattrPageModule),
  },
  {
    path: 'qrscanner',
    loadChildren: () =>
      import('./qrscanner/qrscanner.module').then((m) => m.QrscannerPageModule),
  },
  {
    path: 'oggetto',
    loadChildren: () =>
      import('./oggetto/oggetto.module').then((m) => m.OggettoPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
