import { NgxUpperCaseDirectiveModule } from 'ngx-upper-case-directive';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';

import { CoreModule } from '../core/core.module';
import { MatPaginatorI18nService } from '../core/services/mat-paginator-i18n.service';
import { MaterialModule } from '../material/material.module';
import { NgxTranslateModule } from '../ngx-translate/ngx-translate.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, SidenavComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    NgxUpperCaseDirectiveModule,
    ReactiveFormsModule,
    RouterModule,
    CoreModule,
    NgxTranslateModule
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorI18nService }],
  exports: [HeaderComponent, FooterComponent, SidenavComponent]
})
export class SharedModule {}
