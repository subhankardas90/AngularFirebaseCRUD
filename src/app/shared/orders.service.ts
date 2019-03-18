import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private angularFireStore : AngularFirestore) { }

  form = new FormGroup({
    customerName : new FormControl(""),
    orderNumber : new FormControl(""),
    coffeeOrder : new FormControl(""),
    completed : new FormControl(false)
  });

  createCoffeeOrder(coffee){
    return new Promise<any>((resolve, reject) =>{
      this.angularFireStore.collection("coffeeOrders").add(coffee).then(res =>{}, err => reject(err));
    });
  }

  getCoffeeOrder(){
    return this.angularFireStore.collection("coffeeOrders").snapshotChanges();
  }
  
  updateCoffeeOrder(coffee){
      return this.angularFireStore.collection("coffeeOrders").doc(coffee.payload.doc.id).set({completed : true} , {merge : true});
  }

  deleteCoffeeOrder(coffee){
      return this.angularFireStore.collection("coffeeOrders").doc(coffee.payload.doc.id).delete();
  }

}
