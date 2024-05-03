import { AppConfigurationsService } from '@app/app/configurations/app-configurations.service';
import { Injectable } from '@nestjs/common';
import { Pool, PoolClient } from 'pg';

@Injectable()
export class PgService {
  private readonly dbPool: Pool;

  private readonly config;

  constructor(
    private readonly appConfigurationService: AppConfigurationsService,
  ) {
    this.config = {
      host: this.appConfigurationService.PGHOST,
      user: this.appConfigurationService.PGUSER,
      password: this.appConfigurationService.PGPASSWORD,
      port: Number(this.appConfigurationService.PORT),
      database: this.appConfigurationService.PGDATABASE,
      ssl: 'require',
      connection: {
        options: `project=${this.appConfigurationService.ENDPOINT_ID}`,
      },
    };
    this.dbPool = new Pool(this.config);
  }

  private readonly debugDatabase = Number(process.env.DATABASE_DEBUG_FLAG);

  getDbClient = (tx?: PoolClient): Promise<PoolClient> => {
    if (tx) {
      return tx as unknown as Promise<PoolClient>;
    }
    return this.dbPool.connect();
  };

  dbQueryRow = async <T = any>(
    sql: string,
    values: any[] | null,
    tx?: PoolClient,
  ): Promise<T> => {
    const client = await this.getDbClient(tx);
    const start = Date.now();

    if (Array.isArray(values)) {
      try {
        if (this.debugDatabase) {
          console.log('executed query', { sql });
        }
        const res = await client.query(sql, values);
        if (this.debugDatabase) {
          const duration = Date.now() - start;
          console.log('result data', { duration, rows: res.rowCount });
        }

        //return (res.command === "DELETE" ? res.rowCount !== 0 : res.rows[0]) as T;
        return res.rows[0] as T;
      } catch (e) {
        throw e;
      } finally {
        if (!tx) client.release();
      }
    }

    try {
      if (this.debugDatabase) {
        console.log('executed query', { sql });
      }
      const res = await client.query(sql);
      if (this.debugDatabase) {
        const duration = Date.now() - start;
        console.log('result data', { duration, rows: res.rowCount });
      }

      return res.rows[0] as T;
    } catch (e) {
      console.log(e);
      throw e;
    } finally {
      if (!tx) client.release();
    }
  };

  dbQuery = async <T = any>(
    sql: string,
    values: any[] | null,

    tx?: PoolClient,
  ) => {
    const client = await this.getDbClient(tx);
    const start = Date.now();

    if (Array.isArray(values)) {
      try {
        if (this.debugDatabase) {
          console.log('executed query', { sql });
        }
        const res = await client.query(sql, values);
        if (this.debugDatabase) {
          const duration = Date.now() - start;
          console.log('result data', { duration, rows: res.rowCount });
        }

        return res.rows as T[];
      } catch (e) {
        throw e;
      } finally {
        if (!tx) client.release();
      }
    } else {
      try {
        if (this.debugDatabase) {
          console.log('executed query', { sql });
        }
        const res = await client.query(sql);
        if (this.debugDatabase) {
          const duration = Date.now() - start;
          console.log('result data', { duration, rows: res.rowCount });
        }

        return res.rows as T[];
      } catch (e) {
        console.log(e);
        throw e;
      } finally {
        if (!tx) client.release();
      }
    }
  };
}
