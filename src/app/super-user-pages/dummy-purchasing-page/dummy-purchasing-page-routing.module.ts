import { AuthGuard } from 'src/app/pages/guards/auth.guard';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DummyPurchasingPageComponent } from './dummy-purchasing-page.component';

const routes: Routes = [{ path: '', component: DummyPurchasingPageComponent, canActivate: [AuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DummyPurchasingPageRoutingModule {}
