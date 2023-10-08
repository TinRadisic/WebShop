import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private filteredProductsSource = new BehaviorSubject<Product[]>([]);
  filteredProducts$ = this.filteredProductsSource.asObservable();

  updateFilteredProducts(products: Product[]) {
    this.filteredProductsSource.next(products);
  }
}
