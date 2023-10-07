import { StoreService } from './../../../../services/store.service';
import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  minPrice: number | undefined;
  maxPrice: number | undefined;
  filteredProducts: Product[] = [];
  
  @Output() showCategory = new EventEmitter<string>();

  categoriesSubscription: Subscription;

  categories: Array<string> | undefined;

  constructor (private storeService: StoreService) {}

  ngOnInit(): void {
    this.categoriesSubscription = this.storeService
    .getAllCategories()
    .subscribe ((response: Array<string>) => {
      this.categories = response;
    });
  }

  onShowCategory (category: string): void {
    this.showCategory.next(category);
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }

  onApplyPriceRange() {
    if (typeof this.minPrice === 'number' && typeof this.maxPrice === 'number') {      // Check if both 'minPrice' and 'maxPrice' are defined and valid numbers
   
      this.filteredProducts = this.products.filter(product => {          // Filter products based on the price range
        const productPrice = product.price;                     // Replace 'price' with your product property name

        return productPrice >= this.minPrice && productPrice <= this.maxPrice;    // Check if the product's price falls within the specified range

      });
    } else {
      // Handle invalid input (e.g., show an error message)
      console.log('Invalid price range');
    }
  }

}
