import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiKeyStrategy,
  createClient,
  IApiKeyStrategy,
  WixClient,
} from '@wix/sdk';
import { products } from '@wix/stores';
import { map, Observable } from 'rxjs';
import { WixProductData } from '../../products/wix-product.interface';

@Injectable()
export class WixApiService {
  url = `${this.configService.get<string>('WIX_API_URL')}/products`;

  wixClient: WixClient<
    undefined,
    IApiKeyStrategy,
    {
      products: any;
    }
  >;
  get wixHeaders() {
    return {
      Authorization: this.configService.get<string>('WIX_API_KEY'),
      'wix-account-id': this.configService.get<string>('WIX_ACCOUNT_ID'),
      'wix-site-id': this.configService.get<string>('WIX_SITE_ID'),
    };
  }
  constructor(
    private http: HttpService,
    private configService: ConfigService,
  ) {
    const strategy = ApiKeyStrategy({
      siteId: this.configService.get<string>('WIX_SITE_ID'),
      accountId: this.configService.get<string>('WIX_ACCOUNT_ID'),
      apiKey: this.configService.get<string>('WIX_API_KEY'),
    });

    this.wixClient = createClient({
      auth: strategy,
      modules: {
        products,
      },
    });
  }

  async queryProducts(): Promise<any> {
    //@ts-expect-error No typification found for wixClient
    const res = await this.wixClient?.products.queryProducts().find();
    return res.items as WixProductData[];
  }

  getProduct(id: string): Observable<any> {
    return this.http
      .get<any>(`${this.url}/${id}`, {
        headers: this.wixHeaders,
      })
      .pipe(map((res) => res.data));
  }

  async createProduct(product: any): Promise<any> {
    console.log(product);
    //@ts-expect-error No typification found for wixClient
    return this.wixClient?.products.createProduct(product);
  }

  async editProduct(product: any, id: string): Promise<any> {
    //@ts-expect-error No typification found for wixClient
    return this.wixClient?.products.updateProduct(id, product);
  }

  deleteProduct(id: string): Observable<any> {
    //@ts-expect-error No typification found for wixClient
    return this.wixClient?.products.deleteProduct(id);
  }
}
