import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { DashboardComponent } from './customer-components/dashboard/dashboard.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { ViewProductsByCategoryComponent } from './customer-components/view-products-by-category/view-products-by-category.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { PostReservationComponent } from './customer-components/post-reservation/post-reservation.component';
import { GetAllReservationsComponent } from './customer-components/get-all-reservations/get-all-reservations.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ViewProductsByCategoryComponent,
    PostReservationComponent,
    GetAllReservationsComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NzPageHeaderModule,
    NzLayoutModule,
    NzButtonModule,
    NzSpinModule,
    NzFormModule,
    NzIconModule,
    NzInputModule,
    NzGridModule,
    NzCheckboxModule,
    NzModalModule,
    NzMenuModule,
    NzMessageModule,
    NzDropDownModule,
    NzTableModule,
    NzAlertModule,
    NzPaginationModule,
    NzSelectModule,
    NzDatePickerModule
  ]
})
export class CustomerModule { }
