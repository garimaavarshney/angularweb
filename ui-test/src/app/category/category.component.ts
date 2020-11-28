import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Settings } from '../config/constants';
import { HttpDataService } from '../services/http-data.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {

  categoryForm: FormGroup;
  CONST = Settings.CONSTANTS;
  showalert = false;
  alertMessage = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private httpDataService: HttpDataService
  ) {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      slug: ['', Validators.required]
    });
  }

  ngOnInit() {
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
      name: _formvalue.value.name,
      slug: _formvalue.value.slug
    };
    let URL = this.CONST.API.createCategory;
    this.httpDataService.postApis(data, URL).subscribe(
      (res: any) => {
        console.log("res ", res);
        if (res.code === 202) {
          this.router.navigate(['home']);
        } else {
          this.errorCheck();
        }
      },
      (error: any) => this.errorCheck()
    );
  }

  errorCheck() {
    this.showalert = true;
    this.alertMessage = this.CONST.message_error;
    setTimeout(() => { this.showalert = false; },
      this.CONST.alert_hide_time);
  }

}
