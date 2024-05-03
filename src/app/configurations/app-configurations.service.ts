import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppConfigurationsService {
  private _PGHOST: string;
  private _PGDATABASE: string;
  private _PGUSER: string;
  private _PGPASSWORD: string;
  private _ENDPOINT_ID: string;
  private _PORT: number;
  private _MONGOURL: string;

  constructor(private readonly configService: ConfigService) {
    const _PGHOST = this.configService.get<string>('PGHOST');
    const _PGDATABASE = this.configService.get<string>('PGDATABASE');
    const _PGUSER = this.configService.get<string>('PGUSER');
    const _PGPASSWORD = this.configService.get<string>('PGPASSWORD');
    const _ENDPOINT_ID = this.configService.get<string>('ENDPOINT_ID');
    const _PORT = this.configService.get<number>('PGPORT');
    const _MONGOURL = this.configService.get<string>('MONGOURL');

    if (
      !_PGHOST ||
      !_PGDATABASE ||
      !_PGUSER ||
      !_PGPASSWORD ||
      !_ENDPOINT_ID ||
      !_PORT ||
      !_MONGOURL
    ) {
      throw new Error(`Environment variables are missing`);
    }

    this._PGHOST = _PGHOST;
    this._PGDATABASE = _PGDATABASE;
    this._PGUSER = _PGUSER;
    this._PGPASSWORD = _PGPASSWORD;
    this._ENDPOINT_ID = _ENDPOINT_ID;
    this._PORT = _PORT;
    this._MONGOURL = _MONGOURL;
  }

  get PGHOST(): string {
    return this._PGHOST;
  }

  get PGDATABASE(): string {
    return this._PGDATABASE;
  }

  get PGUSER(): string {
    return this._PGUSER;
  }

  get PGPASSWORD(): string {
    return this._PGPASSWORD;
  }

  get ENDPOINT_ID(): string {
    return this._ENDPOINT_ID;
  }

  get PORT(): number {
    return this._PORT;
  }

  get MONGOURL(): string {
    return this._MONGOURL;
  }
}
