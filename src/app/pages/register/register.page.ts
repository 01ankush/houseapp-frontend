import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  firstName : string | undefined
  lastName: string | undefined
  email: string | undefined
  password: string | undefined
  userName: string | undefined
  isLoading : boolean = false


  constructor(private http : HttpClient,private alertController: AlertController,private router : Router) { }

  ngOnInit() {
  }
  register(){
  this.isLoading  = true
    let user = {
      email : this.email,
      firstName : this.firstName,
      lastName : this.lastName,
      userName : this.userName,
      password : this.password
    }
    this.http.post('http://localhost:3000/users/register',user)
    .subscribe(res=>{
      this.isLoading  = false
      localStorage.setItem('User',JSON.stringify(res))
      this.router.navigateByUrl('',{replaceUrl : true})
      console.log(user)
    },error=>{
      this.isLoading  = false
      this.presentAlert('You have already registered, Please login',error.error.error)
      // console.log(error)
    })
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
