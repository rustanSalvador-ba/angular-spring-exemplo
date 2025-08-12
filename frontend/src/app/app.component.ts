import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { Router } from '@angular/router';
import { Employee } from './employee'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  id: string;
  employee: Employee = new Employee();
  type: string;
  title = 'Gerenciar Funcionários';
  constructor( private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {

	this.id = window.location.href.substring((window.location).href.lastIndexOf('/') + 1);
     if (this.id) {
		    this.employeeService.getEmployeeById(this.id).subscribe(data => {
	      this.employee = data;
	      this.type = data.type;
      if (!this.employee.status) {
         Swal.fire({title: "Ops!",  text: "Acesso não autorizado.",  icon: 'error'});
         this.router.navigate(['login']);
      }
		}, error => {
			Swal.fire({title: "Ops!",  text: error.error.message,  icon: 'error'});
			this.router.navigate(['login']);
		}
		);
	  } else {
		  this.router.navigate(['login']);
	  }
  }

  goToEmployeeList(id:string){
    this.router.navigate(['/employees/' + id]);
  }

  goToEmployeeCreate(id: string){
    this.router.navigate(['/create-employee/'+ id]);
  }

  logout(id: string){
	this.employeeService.logout(id).subscribe( data =>{
		   this.id = '0';
		   this.type = "";
	       this.router.navigate(['/login']);
  },
	    error => Swal.fire({title: "Ops!",  text: error.error.message,  icon: 'error'}));
  }
}

