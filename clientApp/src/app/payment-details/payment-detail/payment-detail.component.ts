import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from '../../shared/payment-detail.service'
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styles: []
})
export class PaymentDetailComponent implements OnInit {
  constructor(private service: PaymentDetailService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm()
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.service.formData = {
      pmId: 0,
      cardOwnerName: "",
      expirationDate: "",
      cardNumber: "",
      cvv: ""
    }

  }
  onSubmit(form: NgForm) {
    if (this.service.formData.pmId == 0) {
      this.insertRecord(form);
    }else{
      this.updateRecord(form);
      
    }


  }

  insertRecord(form: NgForm) {
    this.service.postPaymentDetails(form.value).subscribe(
      res => {
        this.resetForm(form);
        console.log(res);
        this.toastr.success("Submited Successfully")
        this.service.refreshList()
      },
      err => {
        console.log(err);
      }
    )
  }
  updateRecord(form: NgForm) {
    this.service.putPaymentDetails().subscribe(
      res => {
        this.resetForm(form);
        console.log(res);
        this.toastr.success("updated Successfully")
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }

}
