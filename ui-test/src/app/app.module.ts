import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { HeaderComponent } from './header/header.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: 'category', component: CategoryComponent },
  { path: 'subcategory', component: SubCategoryComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', component: HomeComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    HeaderComponent,
    SubCategoryComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
