import { IPriceFilter } from './../../models/priceFilter.model';
import { StoreService } from './../../services/store.service';
import { CartService } from './../../services/cart.service';
import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  EventEmitter,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { FilterService } from 'src/app/services/filter.service';

const ROWS_HEIGHT: { [id: number]: number } = {
  1: 400,
  3: 335,
  4: 350,
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  receivedPrice: IPriceFilter;

  onPriceReceived(data: IPriceFilter) {
    this.receivedPrice = data;
    if (this.receivedPrice.maxPrice && this.receivedPrice.minPrice) {
      this.getProductsWithPrice(this.receivedPrice);
    } else {
      this.getProducts();
    }
  }

  filteredProducts: Product[] = [];

  category: string | undefined;
  itemsPerRow = 3;
  rowHeight = ROWS_HEIGHT[this.itemsPerRow];
  products: Array<Product> | undefined;
  sort = 'desc';
  count = '12';
  productsSubscription: Subscription | undefined;

  constructor(
    private CartService: CartService,
    private storeService: StoreService,
    private filterService: FilterService
  ) {
    this.filterService.filteredProducts$.subscribe((products) => {
      this.filteredProducts = products;
    });
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProductsWithPrice(price: IPriceFilter): void {
    if (price.minPrice !== undefined && price.maxPrice !== undefined) {
      // Filter products based on price range
      this.filteredProducts = this.products.filter(
        (product) =>
          product.price >= price.minPrice && product.price <= price.maxPrice
      );
      this.products = this.filteredProducts;
    }
  }

  getProducts(): void {
    this.productsSubscription = this.storeService
      .getAllProducts(this.count, this.sort, this.category)
      .subscribe((_products) => {
        this.products = _products;
        if (this.receivedPrice?.maxPrice && this.receivedPrice?.minPrice) {
          this.getProductsWithPrice(this.receivedPrice);
        }
      });
  }

  onColumnsCountChange(colsNum: number) {
    this.itemsPerRow = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.itemsPerRow];
  }
  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.getProducts();
  }

  onAddToCart(product: Product): void {
    this.CartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }

  onItemsCountChange(newCount: number): void {
    this.count = newCount.toString();
    this.getProducts();
  }

  onSortChange(newSort: string): void {
    this.sort = newSort;
    this.getProducts();
  }
}
