import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee'
import { EmployeeService } from '../employee.service'
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})

export class EmployeeListComponent implements OnInit {

  id: string;
  type:string;
  employees: Employee[];
  employee: Employee = new Employee();

  constructor(private employeeService: EmployeeService,
    private router: Router,
    private route:  ActivatedRoute) { }

  ngOnInit(): void {
	 this.id = this.route.snapshot.params['id'];

	 this.employeeService.getEmployeeById(this.id).subscribe(data => {
	     this.employee = data;
	     this.type = data.type;
	      if (!this.employee.status) {
			   Swal.fire({title: "Ops!",  text: "Acesso não autorizado.",  icon: 'error'});
				 this.router.navigate(['login']);
			  }

	     this.getEmployees();

    }, error => {
		  Swal.fire({title: "Ops!",  text: error.error.message,  icon: 'error'});
		  this.router.navigate(['login']);
    })
  }

  private getEmployees(){
    this.employeeService.getEmployeesList(this.employee.id).subscribe(data => {
      this.employees = data;
    });
  }

  employeeDetails(id: string, id_user: string){
    this.router.navigate(['employee-details', id, id_user]);
  }

  updateEmployee(id: string, id_user: string){
    this.router.navigate(['update-employee', id, id_user]);
  }

 updateSaldo(id: string, id_user: string){
    this.router.navigate(['update-saldo', id, id_user]);
  }

  deleteEmployee(id: string){
    this.employeeService.deleteEmployee(id).subscribe( data => {
	    Swal.fire({title: "Excluído com sucesso!", icon: 'success'});

	    if (id == this.employee.id) {
		  	this.router.navigate(['login']);
		  } else {
			  this.getEmployees();
	  	}
    })
  }
}
