import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})

export class EmployeeDetailsComponent implements OnInit {

  id: number;
  id_user: number
  employee: Employee;
  constructor(private route: ActivatedRoute,
  private router: Router, private employeService: EmployeeService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.employee = new Employee();
    this.employeService.getEmployeeById(this.id).subscribe( data => {
      this.employee = data;
    });

    this.id_user = this.route.snapshot.params['id_user'];
    this.employeService.getEmployeeById(this.id_user).subscribe(data => {
      if (!data.status) {
			  Swal.fire({title: "Ops!",  text: "Acesso não autorizado.",  icon: 'error'});
				this.router.navigate(['login']);
	    }
    }, error => {
      Swal.fire({title: "Ops!",  text: error.error.message,  icon: 'error'});
      this.router.navigate(['login']);
	  });
  }

}
