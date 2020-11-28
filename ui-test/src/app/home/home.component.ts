import { Component, OnInit } from '@angular/core';
import { Settings } from '../config/constants';
import { HttpDataService } from '../services/http-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  CONST = Settings.CONSTANTS;
  showloader = false;
  showalert = false;
  alertMessage = '';
  isCatData = false;
  isSubCatData = false;
  category: any;
  subcategory: any;

  constructor(
    private httpDataService: HttpDataService
  ) { }

  ngOnInit() {
    this.getCategoryData();
  }

  getCategoryData() {
    let URL = this.CONST.API.fetchCategory;
    this.httpDataService.postApis({}, URL).subscribe(
      (res: any) => {
        if (res.code === 202) {
          this.isCatData = true;
          this.category = res.data;
        } else if (res.code === 404) {
          this.isCatData = false;
          this.category = [];
        } else {
          this.errorCheck();
        }
      },
      (error: any) => this.errorCheck()
    );
  }

  selectCategory(_value) {
    this.getSubCategoryData(_value);
  }

  getSubCategoryData(category) {
    let data = {
      category: category
    }
    let URL = this.CONST.API.fetchSubCategory;
    this.httpDataService.postApis(data, URL).subscribe(
      (res: any) => {
        if (res.code === 202) {
          this.isSubCatData = true;
          this.subcategory = res.data;
        } else if (res.code === 404) {
          this.isSubCatData = false;
          this.subcategory = [];
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
