import { Component, OnInit } from "@angular/core";
import { CartService } from "./cart.service";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Product_details } from "../product-details.service";
import { Product, products } from "../products";
import { BehaviorSubject, Observable } from "rxjs";
import { MatSelectChange, MatSelectModule } from "@angular/material/select";
@Component({
  selector: "app-cart",
  templateUrl: "./cart.html",
  styleUrls: ["./cart-style.scss"],
})
export class CartComponent implements OnInit {
  product: Product | undefined;
  items!: Observable<Product[]>;
  total = 0;

  constructor(private route: ActivatedRoute, private cartService: CartService) {
    // console.log("sssss", cartService.items.value);
  }

  addToCart(product: Product, amount: number): void {
    this.cartService.addToCart(product);

    window.alert("This product has been added to the cart");
  }

  removeItems(productToRemove: Product) {
    this.cartService.removeItems(productToRemove);
  }

  getTotalSum(): void {
    this.cartService.getItems().subscribe((items) => {
      this.total = items.reduce(
        (sum, item) => sum + item.price * item.amount,
        0
      );
    });
  }

  ngOnInit(): void {
    this.items = this.cartService.items.asObservable();
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get("productId"));
    this.route.data.subscribe((data) => {
      const productDetails: Product_details = data["Product_details"];
    });
    this.getTotalSum();

    // setInterval(() => {
    //   this.cartService.clearCartCache();
    // }, 24 * 60);
  }
}
