import { Injectable } from '@angular/core';
import {PaymentDetail} from './payment-detail.model'
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {
  formData:PaymentDetail
  constructor(private http:HttpClient) { }
  readonly rootURL = "http://localhost:56176/api/"
  list: PaymentDetail[]

  postPaymentDetails(formData:PaymentDetail){
    
    return this.http.post(this.rootURL+"PaymentDetails",this.formData)
  }
  putPaymentDetails(){
    
    return this.http.put(this.rootURL+"PaymentDetails/"+this.formData.pmId,this.formData)
  }
  deletePaymentDetails(id){
   
    return this.http.delete(this.rootURL+"PaymentDetails/"+id)
  }
  refreshList(){
    this.http.get(this.rootURL+"PaymentDetails").toPromise().then(res =>this.list=res as PaymentDetail[])
  }
}

