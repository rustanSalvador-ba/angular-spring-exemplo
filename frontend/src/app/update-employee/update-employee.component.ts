import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})

export class UpdateEmployeeComponent implements OnInit {

  id: string;
  id_user: string;
  UsernameRequired = new FormControl();
  LastnameRequired = new FormControl();
  EmailRequired = new FormControl();
  EmailValid = new FormControl();
  messageInputRequired = "O campo é obrigatório.";
  messageInputEmailValid = "Formato de e-mail inválido.";

  employee: Employee = new Employee();
  constructor(private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.id_user = this.route.snapshot.params['id_user'];
    this.employeeService.getEmployeeById(this.id_user).subscribe(data => {

      if (!data.status) {
			     Swal.fire({title: "Ops!",  text: "Acesso não autorizado.",  icon: 'error'});
				 this.router.navigate(['login']);
	  }
    }, error => {
		Swal.fire({title: "Ops!",  text: error.error.message,  icon: 'error'});
		this.router.navigate(['login']);
	}
    );
    this.employeeService.getEmployeeById(this.id).subscribe(data => {
	 this.employee = data;
    }, error => {
		Swal.fire({title: "Ops!",  text: error.error.message,  icon: 'error'});
		this.router.navigate(['login']);
	}
    );
  }

  onSubmit(){

	 this.UsernameRequired = new FormControl(this.employee.firstName, Validators.required);
	 this.LastnameRequired = new FormControl(this.employee.lastName, Validators.required);
	 this.EmailRequired = new FormControl(this.employee.emailId, Validators.required);
	 this.EmailValid = new FormControl(this.employee.emailId, Validators.email);

      if (!this.UsernameRequired.errors && !this.LastnameRequired.errors
	      && !this.EmailRequired.errors && !this.EmailValid.errors) {

		 this.employeeService.updateEmployee(this.id, this.employee).subscribe( data =>{
			Swal.fire({title: "Editado com sucesso!", icon: 'success'})
			history.back()
		}, error => Swal.fire({title: "Ops!",  text: error.error.message,  icon: 'error'}));
    }
  }
}
