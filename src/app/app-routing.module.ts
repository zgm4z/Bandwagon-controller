import {HomeComponent} from './components/home/home.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ServerDetailComponent} from './components/server-detail/server-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }, {
    path: 'detail',
    component: ServerDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
