import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IProduct } from './models/product';
import { IPagination } from './models/pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Skinet';
  products: IProduct[] = []; // Ajouter cette propriété pour stocker les produits

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('https://localhost:5160/api/products?pageSize=50').subscribe(
      (response) => {
        console.log('API Response:', response);  // Vérifiez la structure ici
        this.products = response.data ? response.data : response;
      },
      error => {
        console.error('Erreur:', error);
      }
    );
    
  }
}
