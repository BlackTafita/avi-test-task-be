import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, EMPTY, map } from 'rxjs';

@Injectable()
export class WixApiService {
  url = `/products`;
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
  ) {}

  queryProducts() {
    return this.http
      .post(
        `${this.url}/query`,
        {},
        {
          headers: this.wixHeaders,
        },
      )
      .pipe(
        catchError((err) => {
          console.error(err);
          return EMPTY;
        }),
        map((res) => res.data),
      );
  }
}
