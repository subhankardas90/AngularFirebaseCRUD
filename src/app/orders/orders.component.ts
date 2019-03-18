import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { OrdersService } from "../shared/orders.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private orderService: OrdersService) { }

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
    this.orderService.form.value.coffeeOrder = this.coffeeOrder;
    let data = this.orderService.form.value;

    this.orderService.createCoffeeOrder(data).then(res=>{
      console.log("Order Successful");
    });
  }

}
