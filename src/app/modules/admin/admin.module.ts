import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './admin-components/dashboard/dashboard.component';
import { AddCategoryComponent } from './admin-components/add-category/add-category.component';
import { NzFormModule } from 'ng-zorro-antd/form';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

import { NzSpinModule } from 'ng-zorro-antd/spin';

import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { PostProductComponent } from './admin-components/post-product/post-product.component';
import { ViewProductsComponent } from './admin-components/view-products/view-products.component';
import { UpdateProductComponent } from './admin-components/update-product/update-product.component';
import { GetReservationsComponent } from './admin-components/get-reservations/get-reservations.component';





@NgModule({
  declarations: [
    DashboardComponent,
    AddCategoryComponent,
    PostProductComponent,
    ViewProductsComponent,
    UpdateProductComponent,
    GetReservationsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
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
    
    
  ]
})
export class AdminModule { }
