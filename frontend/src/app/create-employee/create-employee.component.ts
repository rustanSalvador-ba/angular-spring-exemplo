import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})



export class CreateEmployeeComponent implements OnInit {

  id: number;
  UsernameRequired = new FormControl();
  LastnameRequired = new FormControl();
  EmailRequired = new FormControl();
  EmailValid = new FormControl();
  PasswordRequired = new FormControl();
  TypeRequired = new FormControl();
  messageInputRequired = "O campo é obrigatório.";
  messageInputEmailValid = "Formato de e-mail inválido.";

  employee: Employee = new Employee();
  constructor(private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
	this.id = this.route.snapshot.params['id'];
	this.employeeService.getEmployeeById(this.id).subscribe(data => {
	     this.employee = data;
	      if (!this.employee.status) {
			     Swal.fire({title: "Ops!",  text: "Acesso não autorizado.",  icon: 'error'});
				 this.router.navigate(['login']);
			}

    }, error => {
		Swal.fire({title: "Ops!",  text: error.error.message,  icon: 'error'});
		this.router.navigate(['login']);
    })
  }

  saveEmployee(){

	 if (!this.employee.status) {
      Swal.fire({title: "Ops!",  text: "Acesso não autorizado.",  icon: 'error'});
      this.router.navigate(['login']);
	  }

	 this.UsernameRequired = new FormControl(this.employee.firstName, Validators.required);
	 this.LastnameRequired = new FormControl(this.employee.lastName, Validators.required);
	 this.EmailRequired = new FormControl(this.employee.emailId, Validators.required);
	 this.EmailValid = new FormControl(this.employee.emailId, Validators.email);
	 this.PasswordRequired = new FormControl(this.employee.password, Validators.required);
	 this.TypeRequired = new FormControl(this.employee.type, Validators.required);

      if (!this.UsernameRequired.errors && !this.LastnameRequired.errors
	      && !this.EmailRequired.errors && !this.EmailValid.errors
	      && !this.PasswordRequired.errors && !this.TypeRequired.errors) {

		this.employeeService.createEmployee(this.employee).subscribe( data =>{
			this.employee = data;
			Swal.fire({title: "Cadastrado com sucesso!",  text: this.employee.emailId,  icon: 'success'})
			this.goToEmployeeList(this.id);
	    },
	    error =>  {
			Swal.fire({title: "Ops!",  text: error.error.message,  icon: 'error'});
    	})
	  }
  }

  goToEmployeeList(id: number){
    this.router.navigate(['/employees/'+ id]);
  }

  onSubmit(){
    this.saveEmployee();
  }
}
