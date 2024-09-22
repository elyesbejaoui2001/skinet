import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/models/pagination';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/productType';
import { delay, map } from 'rxjs/operators';
import { ShopParams } from '../shared/models/shopParams';



@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5160/api/';

  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();
    
    // Ajouter des paramètres pour le brandId, typeId, et sort
    if (shopParams.brandId && shopParams.brandId > 0) {
      params = params.append('brandId', shopParams.brandId.toString());
    }
    if (shopParams.typeId && shopParams.typeId > 0) {
      params = params.append('typeId', shopParams.typeId.toString());
    }
    params = params.append('sort', shopParams.sort);
    
    // Ajouter des paramètres pour la pagination
    params = params.append('pageNumber', shopParams.pageNumber.toString());
    params = params.append('pageSize', shopParams.pageSize.toString());
    
    return this.http.get<IPagination>(this.baseUrl + 'products', { observe: 'response', params })
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }
  
  
  
  getBrands()
  {
    return this.http.get<IBrand[]>(this.baseUrl +'products/brands');
  }
  getTypes()
  {
    return this.http.get<IType[]>(this.baseUrl +'products/types');
  }
  
}
