import { Module } from '@nestjs/common';
import { User } from '../../entity/User';
import { Task } from '../../entity/Task';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [
          // __dirname + '/../**/*.entity.ts',
          User,
          Task
        ],
        synchronize: true,
        autoLoadEntities: true,
        // logging: true,
      })
    }),
  ],
})
export class DatabaseModule { }
