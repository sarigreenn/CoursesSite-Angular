import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl:'./login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  public addForm!: FormGroup;
 
 
  constructor(private router: Router ,private _UserService: UserService) {

  }
  ngOnInit(): void {
    this.addForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(2)]),
      'password': new FormControl(null, Validators.required)
      // 'Lectu': new FormControl("1234")
    });
  }
  public save(){
    let p = this.addForm.value
    this._UserService.getUserFromServer().subscribe({
      next: (res) => {
        console.log(res)
     let find= res.find(r=>(r.name==p.name&&r.password==p.password))
     if (find)
     {
   
      let userJson = JSON.stringify(find)
       const user = localStorage.setItem("user", userJson)
     this.router.navigate(["/AllCourse"])
     }
     else
     {
      let find2= res.find(r=>(r.name==p.name))
      if(find2)
      {
        alert("Passwors is Incorrect")
      }
else{
  
      this.router.navigate(["/register"],{queryParams:{name:p.name}})

}
     }

      },
      error: (err) => {
        console.log(err);
      }
})
}
}


