import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Settings } from '../config/constants';
import { HttpDataService } from '../services/http-data.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})

export class SubCategoryComponent implements OnInit {

  subcategoryForm: FormGroup;
  CONST = Settings.CONSTANTS;
  showalert = false;
  alertMessage = '';
  isCatData = false;
  category: any;
  cat_id: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private httpDataService: HttpDataService
  ) {
    this.subcategoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      slug: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getCategoryData();
  }

  getCategoryData() {
    let URL = this.CONST.API.fetchCategory;
    this.httpDataService.postApis({}, URL).subscribe(
      (res: any) => {
        if (res) {
          this.isCatData = true;
          this.category = res.data;
        } else {
          this.isCatData = false;
          this.category = [];
        }
      },
      (error: any) => this.errorCheck()
    );
  }

  checkForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key) => {
      if (formGroup.get(key).value)
        formGroup.get(key).setValue(formGroup.get(key).value.trim())
    });
  }

  onSubmit(_formvalue) {
    this.checkForm(_formvalue);
    let data = {
      category: this.cat_id,
      name: _formvalue.value.name,
      slug: _formvalue.value.slug
    };
    let URL = this.CONST.API.createSubCategory;
    this.httpDataService.postApis(data, URL).subscribe(
      (res: any) => {
        if (res.code === 202) {
          this.router.navigate(['home']);
        } else {
          this.errorCheck();
        }
      },
      (error: any) => this.errorCheck()
    );
  }

  saveCategory(_value) {
    this.cat_id = _value;
  }

  errorCheck() {
    this.showalert = true;
    this.alertMessage = this.CONST.message_error;
    setTimeout(() => { this.showalert = false; },
      this.CONST.alert_hide_time);
  }

}
