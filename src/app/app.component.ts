import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'untitled4';
  classifications = [
    {
      tag_name: '0.0',
      confidence: 0.806
    }
  ];

  modelId = 'cl_hAqT8Lxn';
  errMsg = '';
  loader = false;
  dataUrl = `https://api.monkeylearn.com/v3/classifiers/${this.modelId}/classify/`;
  checkoutForm;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.checkoutForm = this.formBuilder.group({
      text: 'Добрый вечер! Очень рад встрече.'
    });
  }

  onSubmit(customerData) {
    const data = customerData.text.trim();
    if (!data) {
      return;
    }
    this.loader = true;

    const text = {
      data: [data]
    };

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Auth-Strategy': 'Anon',
        Authorization: 'Token bf37a9039658acd38ff65f5505d6985e1b97323d'
      }),
    };
    this.http.post(this.dataUrl, text, options)
      .subscribe(
        response => {
          this.classifications = response[0].classifications;
          this.loader = false;
        },
        err => {
          console.error(`${err.error.error_code}: ${err.error.detail}`);
          this.errMsg = 'Сервер недоступен!';
          this.loader = false;
        }
      );
  }
}
