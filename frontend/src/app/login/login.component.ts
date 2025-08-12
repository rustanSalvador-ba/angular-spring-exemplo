import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {
  id: string;
  PasswordRequired = new FormControl();
  EmailRequired = new FormControl();
  EmailValid = new FormControl();
  messageInputRequired = "O campo é obrigatório.";
  messageInputEmailValid = "Formato de e-mail inválido.";
  employee: Employee = new Employee();

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
  }

  login(){

	 this.PasswordRequired = new FormControl(this.employee.password, Validators.required);
	 this.EmailRequired = new FormControl(this.employee.emailId, Validators.required);
	 this.EmailValid = new FormControl(this.employee.emailId, Validators.email);

      if (!this.PasswordRequired.errors && !this.EmailRequired.errors && !this.EmailValid.errors ) {
		this.employeeService.login(this.employee).subscribe( data =>{
			this.employee = data;
			this.id = this.employee.id;
			window.location.href = '/employees/'+this.employee.id;
	    },
	    error => Swal.fire({title: "Ops!",  text: error.error.message,  icon: 'error'}));

	  }
  }

  goToEmployeeList(id: number){
    this.router.navigate(['/employees/'+id]);
  }

  onSubmit(){
    this.login();
  }
}
