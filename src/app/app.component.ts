import { Component } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

function userNameValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^a/)) {
    return { invalidUser: true };
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  myForm: FormGroup;          //对应登录的表单
  userName: AbstractControl;  //输入用户名的输入控件
  password: AbstractControl;  //输入密码的输入控件
  name$: Observable<string>;  //跟踪输入 

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      'userName': ['atlus', Validators.compose([Validators.required, userNameValidator])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    });

    this.userName = this.myForm.controls['userName'];
    this.password = this.myForm.controls['password'];
    this.name$ = this.userName.valueChanges;
    this.userName.valueChanges.subscribe(val => {
      console.log(val);
    });
  }

  onSubmit(value: any) {
    console.log(value);
  }
}
