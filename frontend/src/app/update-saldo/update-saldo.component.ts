import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-saldo',
  templateUrl: './update-saldo.component.html',
  styleUrls: ['./update-saldo.component.css']
})

export class UpdateSaldoComponent implements OnInit {

  id: number;
  id_user: number;
  SaldoRequired = new FormControl();
  SaldoMaxLenght = new FormControl();
  messageInputRequired = "O campo é obrigatório.";
  messageInputMaxLenght = "O campo deve ter menos de 10 digitos.";
  employee: Employee = new Employee();
  constructor(private employeeService: EmployeeService, 
  private route: ActivatedRoute,   private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.employeeService.getEmployeeById(this.id).subscribe(data => {
      this.employee = data;
    }, error =>  {
		Swal.fire({title: "Ops!",  text: error.error.message,  icon: 'error'});
		this.router.navigate(['login']);
    })
    
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
  }

  onSubmit(){
	 this.SaldoRequired = new FormControl(this.employee.saldo, Validators.required);
	 this.SaldoMaxLenght = new FormControl(this.employee.saldo, Validators.maxLength(10));
	 
	 if (!this.SaldoRequired.errors && !this.SaldoMaxLenght.errors) {
		this.employeeService.updateSaldo(this.id, this.employee).subscribe( data =>{
		 Swal.fire({title: "Editado com sucesso!", icon: 'success'})
	     history.back()
        }, error => Swal.fire({title: "Ops!",  text: error.error.message,  icon: 'error'}));
	}
  }
}