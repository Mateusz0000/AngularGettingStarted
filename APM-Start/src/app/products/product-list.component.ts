import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy{
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 10;
    showImage: boolean = false;
    sub!: Subscription;

    private errorMessage: string = '';
    private _listFilter: string = "";

    get listFilter(): string {
      return this._listFilter;
    }
    set listFilter(value: string) {
      this._listFilter = value;

      this.filteredProducts = this.performFilter(value)
      console.log("In setter: ", this._listFilter)
    }

    constructor(private productService: ProductService){

    }

    filteredProducts: IProduct[] = [];
    products: IProduct[] = [];

    toggleImage() : void{
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
      this.sub = this.productService.getProducts()
        .subscribe(
          products => {
            this.products = products;
            this.filteredProducts = this.products;
          },
          err => this.errorMessage = err
        );
    }

    performFilter(filterBy: string): IProduct[]{
      filterBy = filterBy.toLocaleLowerCase();
      
      return this.products.filter((product: IProduct) => 
        product.productName.toLocaleLowerCase().includes(filterBy)
      );
    }

    onNotify(message: string): void {
      this.pageTitle = `Product List: ${message}`
    }

    ngOnDestroy(): void{
      this.sub.unsubscribe();
    }
}