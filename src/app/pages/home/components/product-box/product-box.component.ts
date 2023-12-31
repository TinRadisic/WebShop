import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.css']
})
export class ProductBoxComponent {
  @Input() fullWidthMode = false;
  @Output() addToCart = new EventEmitter();

  @Input() product: Product | undefined;

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}
