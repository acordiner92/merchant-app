import pgPromise, { IDatabase, IMain, utils } from 'pg-promise';
import { IInitOptions } from 'pg-promise';
import { IConnectionParameters } from 'pg-promise/typescript/pg-subset';

/**
 * This method is used to map underscore variables in Postgres
 * to javascript camel-case variables using pg-promise library.
 *
 * @param {*} data
 */
/* eslint-disable functional/no-loop-statement, functional/immutable-data, @typescript-eslint/no-explicit-any,
functional/no-return-void, functional/no-conditional-statement, functional/no-let */
const camelizeColumns = (data: any): void => {
  const template = data[0];
  for (const prop in template) {
    const camel = utils.camelize(prop);
    if (!(camel in template)) {
      for (let i = 0; i < data.length; i++) {
        const d = data[i];
        d[camel] = d[prop];
        delete d[prop];
      }
    }
  }
};
/* eslint-enabled */

const pgOptions: IInitOptions = {
  receive: camelizeColumns,
};

const pgInstance = pgPromise(pgOptions);

export const getConnection = <T>(
  configuration: IConnectionParameters,
): DatabaseConnection<T> => ({
  connection: pgInstance,
  client: pgInstance<T>(configuration),
});
export type DatabaseConnection<T> = {
  readonly connection: IMain;
  readonly client: IDatabase<T>;
};
