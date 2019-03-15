import {ConnectionOptions} from 'typeorm'
import { User } from './src/Auth/User.entity'

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT || 5432),
  database: process.env.POSTGRES_DB || 'qpa',
  entities: ["src/**/*.entity.ts"],
  synchronize: true,
}

export const testConfig: ConnectionOptions = {
  ...config,
  database: 'qpa-test',
  dropSchema: true
}

export default config
