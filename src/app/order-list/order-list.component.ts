import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../shared/orders.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  constructor(private orderService : OrdersService) { }

  ngOnInit() {
    this.getCoffeeOrders();
  }

  coffeeOrders;

  getCoffeeOrders = ()=> this.orderService.getCoffeeOrder().subscribe(res => this.coffeeOrders =res)

  deleteOrder = data => this.orderService.deleteCoffeeOrder(data);

  markCompleted = data => this.orderService.updateCoffeeOrder(data);
}
