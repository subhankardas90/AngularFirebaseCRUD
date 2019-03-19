import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { OrdersService } from "../shared/orders.service";
import { MatDialog } from '@angular/material';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private orderService: OrdersService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  coffees = [
    "Americano",
    "Flat White",
    "Cappuccino",
    "Latte",
    "Espresso",
    "Machiato",
    "Mocha",
    "Hot Chocolate",
    "Tea"
  ]

  coffeeOrder =<any>[];

  addCoffee = coffee => this.coffeeOrder.push(coffee);

  removeCoffee = coffee =>{
    let index = this.coffeeOrder.indexOf(coffee);
    if(index>-1) this.coffeeOrder.splice(index,1);
  }

  onSubmit(){
    const message = `Are you sure you want to Submit the Coffee Order?`;
 
    const dialogData = new ConfirmDialogModel("Please Confirm", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '300px',
      width: '300px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        this.orderService.form.value.coffeeOrder = this.coffeeOrder;
        let data = this.orderService.form.value;
    
        this.orderService.createCoffeeOrder(data).then(res=>{
          console.log("Order Successful");
        });
      }
    });


  }
 
}
