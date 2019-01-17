import 'reflect-metadata';
import '../polyfills';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {HttpClientModule, HttpClient} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';

// NG Translate
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {ElectronService} from './providers/electron.service';

import {WebviewDirective} from './directives/webview.directive';

import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {
  MatButtonModule, MatCardModule,
  MatDialogModule, MatDividerModule,
  MatFormFieldModule, MatGridListModule,
  MatIconModule,
  MatInputModule, MatListModule, MatProgressBarModule, MatProgressSpinnerModule, MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AddNewServerDialogComponent} from './components/add-new-server-dialog/add-new-server-dialog.component';
import {ServerItemComponent} from './components/server-item/server-item.component';
import {ByteUperPipe} from './pipes/byteUper.pipe';
import {ServerDetailComponent} from './components/server-detail/server-detail.component';
import {AppBarComponent} from './components/app-bar/app-bar.component';
import {ServerDetailItemComponent} from './components/server-detail-item/server-detail-item.component';
import {VpsDetailStatisticComponent} from './components/vps-detail-statistic/vps-detail-statistic.component';
import {NgxEchartsModule} from 'ngx-echarts';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,
    AddNewServerDialogComponent,
    ServerItemComponent,
    ByteUperPipe,
    ServerDetailComponent,
    AppBarComponent,
    ServerDetailItemComponent,
    VpsDetailStatisticComponent,
  ],
  imports: [
    BrowserModule,
    NgxEchartsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatInputModule,
    MatIconModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  providers: [ElectronService],
  entryComponents: [AddNewServerDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
