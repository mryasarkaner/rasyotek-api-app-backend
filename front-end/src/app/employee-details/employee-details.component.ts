import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../shared/Employee.service';
import { Epmloyee, Uniler } from '../shared/Epmloyee.model';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  constructor(public empService:EmployeeService, public datepipe:DatePipe, public toast:ToastrService) { }
  @ViewChild(EmployeeFormComponent)
  emp!: EmployeeFormComponent;
  ngOnInit() {
    
    this.empService.getEmployees().subscribe(data=>{
      this.empService.listEmployee=data;
    });
    this.empService.getUni().subscribe(datas=>{this.empService.listUnis=datas;})
   
  }
  
  populateEmployee(selecetedEmployee:Epmloyee)
  {
    let df=this.datepipe.transform(selecetedEmployee.doj,'yyyy-MM-dd');
    selecetedEmployee.doj=df;
    this.empService.employeeData=selecetedEmployee;
    
    if(this.emp.isSlide==='off')
    {
     this.emp.hideShowSlide();
    }
  }
  delete(id:number)
  {
    if(confirm('Bu kişi kalıcı olarak sileceksiniz, eminmisiniz ?'))
    {
      this.empService.deleteEmployee(id).subscribe(data=> {
        this.empService.getEmployees().subscribe(data=>{
          this.empService.listEmployee=data;
          this.toast.error('Başarılı','Bilgi Silme');
        });
      },
      err=>{
      });
    }
  }
 }