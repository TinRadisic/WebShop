import { CartItem } from './../../models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart.model';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  cart: Cart = {items: []};

  dataSource: CartItem[] = [];

  cartSubscription: Subscription | undefined;

  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ];

  constructor (private cartService: CartService, private http: HttpClient) { }

  ngOnInit(): void {
    this.dataSource = this.cart.items;
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = _cart.items; 
    } );
  }

  getTotal(items: Array<CartItem>): number{                         
    return this.cartService.getTotal(items);
  }

  onClearCart (): void {
    this.cartService.clearCart();
  }

  onRemoveFromCart (item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  onAddItem(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  onRemoveItem(item: CartItem): void {
    this.cartService.removeItem(item);
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}
