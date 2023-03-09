import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Designation, Epmloyee, Uniler} from './Epmloyee.model';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private myhttp:HttpClient) { }
  employeeUrl:string='https://localhost:7124/api/Employee';
  designationUrl:string='https://localhost:7124/api/Designation';
  // uniUrl:string='http://universities.hipolabs.com/search?country=Turkey';
  uniUrl:string='http://universities.hipolabs.com/search?name=ankara%20University';
  // uniUrl:string='http://universities.hipolabs.com/search?name=$.{this.employeeData.id}';
  listEmployee:Epmloyee[]=[];
  listUnis:Uniler[]=[];
  
  listDesignation:Designation[]=[];
  employeeData:Epmloyee=new Epmloyee(); //veri eklemek için
;
  saveEmployee()
  {
    return this.myhttp.post(this.employeeUrl,this.employeeData);
  }
  updateEmployee()
  {
    return this.myhttp.put(`${this.employeeUrl}/${this.employeeData.id}` ,this.employeeData);
  }
  getEmployees():Observable<Epmloyee[]>
  {
    return this.myhttp.get<Epmloyee[]>(this.employeeUrl);
  }
  getUni():Observable<Uniler[]>
  {
    return this.myhttp.get<Uniler[]>(this.uniUrl);
  }
  getDesignations():Observable<Designation[]>
  {
    return this.myhttp.get<Designation[]>(this.designationUrl);
  }

  deleteEmployee(id:number)
  {
    return this.myhttp.delete(`${this.employeeUrl}/${id}`);
  }
 }
