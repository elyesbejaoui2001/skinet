import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopService } from './shop.service';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/productType';
import { error } from 'console';
import { ShopParams } from '../shared/models/shopParams';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  
  
  products: IProduct[] = [];  
  brands: IBrand[]= [];
  types: IType[]= [];
  page = 1;
  shopParams= new ShopParams();
  totalItems = 18;
pageSize = 6;
currentPage = 0;
  
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'}
  ];

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
 this.getProducts();
   this.getBrands();
   this.getTypes();
  }
  getProducts()
  {
    this.shopService.getProducts(this.shopParams).subscribe(response => {
    if(response){
      this.products = response;
      console.log("prducts", response)}
        

      
    },error =>{
      console.log(error);
    });
      

  }
  
  getBrands(){
    this.shopService.getBrands().subscribe(response =>{
      this.brands = [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);

    });

  }
  getTypes(){
    this.shopService.getTypes().subscribe(response =>{
      this.types = [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);

    });

  }
  onBrandSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1; // Revenir à la première page après le filtrage
    this.getProducts();  // Met à jour les produits en fonction de la sélection de la marque
  }
  
  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.getProducts();  // Met à jour les produits en fonction de la sélection du type
  }
  onSortSelected(event: Event) {
    const sortValue = (event.target as HTMLSelectElement).value;
    this.shopParams.sort = sortValue;
    this.getProducts();
  }

  
  /*
  nextPage() {
    if (this.currentPage < this.totalPages) {
      console.log("test");
      this.currentPage++;
      this.getProducts();
    }
    else{
      console.log("aaaaaaaa")
    }
    console.log("aaaaaaaa")

  }

  // Méthode pour revenir à la page précédente
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getProducts();
    }
  }
  
*/
  
  
  
  
}
