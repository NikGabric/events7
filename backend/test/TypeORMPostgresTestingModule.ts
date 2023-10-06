import { TypeOrmModule } from '@nestjs/typeorm';

export const TypeORMPostgresTestingModule = (entities: any[]) =>
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost', //change to 'db' for docker
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    entities: [...entities],
    synchronize: true,
    autoLoadEntities: true,
    migrations: [],
  });
