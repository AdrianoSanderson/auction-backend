import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuctionsModule } from './modules/auctions/auctions.module';
import { BidsModule } from './modules/bids/bids.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true, // Apenas para desenvolvimento (cria as tabelas automaticamente)
        timezone: 'Z',
        ssl: {
          rejectUnauthorized: false, // Necessário para conexões externas com o Supabase
        },
      }),
    }),
    UsersModule,
    AuthModule,
    AuctionsModule,
    BidsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}