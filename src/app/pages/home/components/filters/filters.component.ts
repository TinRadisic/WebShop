import { StoreService } from './../../../../services/store.service';
import { outputAst } from '@angular/compiler';
import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showCategory = new EventEmitter<string>();

  categoriesSubscription: Subscription

  categories: Array<string> | undefined;

  constructor (private storeService: StoreService) {

  }

  ngOnInit(): void {
    this.categoriesSubscription = this.storeService.getAllCategories()
    .subscribe ((response) => {
      this.categories = response;
    })
  }

  onShowCategory (category: string): void {
    this.showCategory.emit(category);
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }

}
