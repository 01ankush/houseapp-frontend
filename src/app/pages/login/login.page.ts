import { HttpClient } from '@angular/common/http';
import { Component, OnInit, booleanAttribute } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email : string | undefined
  password : string | undefined
  isLoading : boolean = false

  constructor(private http: HttpClient,private router : Router, private alertController: AlertController) { }

  ngOnInit() {
  }

  login(){
    this.isLoading = true
    let credentials = {
      email : this.email,
      password : this.password,
    }

    this.http.post('http://localhost:3000/users/login',credentials).subscribe(res=>{
    // credentials are correct  
    this.isLoading = false
    localStorage.setItem('User',JSON.stringify(res))
    this.router.navigateByUrl('',{replaceUrl : true})

    },error=>{
      // credentials are not  correct  
    this.isLoading = false
    this.presentAlert('Login Failed',error.error.error)
      console.log(error)
    })

    console.log(credentials)
  }
  async presentAlert(header : string,message : string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();

    const {role} = await alert.onDidDismiss();
  }

}
