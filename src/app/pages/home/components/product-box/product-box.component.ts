import { Component, Input, EventEmitter, Output, Inject } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog'; 
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.css']
})
export class ProductBoxComponent {
  @Input() fullWidthMode = false;
  @Output() addToCart = new EventEmitter();

  @Input() product: Product | undefined;

  constructor(private dialog: MatDialog) {} 

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }

  openDialog(Product): void{
    this.dialog.open(ProductDialogComponent, {
      data: {product: this.product}
    })
  }
}
