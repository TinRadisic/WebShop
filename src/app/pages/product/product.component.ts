import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';
import { Product } from 'src/app/models/product.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productId: string | null = null;
  product: Product | undefined;
  productSubscription: Subscription | undefined;
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('productId');       // Get the 'productId' parameter from the URL
      this.getProduct();                              // Call the method to fetch the product using the extracted ID
    });
  }
  
  getProduct(): void {
    this.productSubscription = this.storeService.getProductById(this.productId)
      .subscribe((_product) => {
        this.product = _product;
      });
  }
  
  constructor(private CartService: CartService, private storeService: StoreService, private route: ActivatedRoute) {}
}
