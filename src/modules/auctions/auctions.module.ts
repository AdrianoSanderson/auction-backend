import { Module } from '@nestjs/common';
import { AuctionsService } from './auctions.service';
import { AuctionsController } from './auctions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auction } from './auctions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Auction])],
  providers: [AuctionsService],
  controllers: [AuctionsController],
  exports: [AuctionsService],
})
export class AuctionsModule {}
