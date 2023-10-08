import { IPriceFilter } from './../../../../models/priceFilter.model';
import { StoreService } from './../../../../services/store.service';
import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showPrice = new EventEmitter<IPriceFilter>();

  sendDataToParent(priceFilter: IPriceFilter) {
    this.showPrice.emit(priceFilter);
  }

  products: Product[] = [];
  minPrice: number | undefined;
  maxPrice: number | undefined;
  filteredProducts: Product[] = [];

  @Output() showProducts = new EventEmitter<Product>();
  @Output() showCategory = new EventEmitter<string>();

  categoriesSubscription: Subscription;

  categories: Array<string> | undefined;

  constructor(
    private storeService: StoreService,
    private filterService: FilterService
  ) {}

  filterProducts() {
    const filteredProducts = this.filterProducts();
    this.filterService.updateFilteredProducts(this.filteredProducts);
  }

  ngOnInit(): void {
    this.categoriesSubscription = this.storeService
      .getAllCategories()
      .subscribe((response: Array<string>) => {
        this.categories = response;
      });
  }

  onShowCategory(category: string): void {
    this.showCategory.next(category);
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }

  onApplyPriceRange(form: NgForm) {
    const priceFilter: IPriceFilter = {
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
    };
    this.showPrice.emit(priceFilter);
  }

  refresh(): void {
    window.location.reload();
  }
}
