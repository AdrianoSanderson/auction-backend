import { Module } from '@nestjs/common';
import { BidsService } from './bids.service';
import { BidsController } from './bids.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bid } from './bid.entity';
import { User } from '../users/users.entity';
import { Auction } from '../auctions/auctions.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Bid, User, Auction])],
  providers: [BidsService],
  controllers: [BidsController]
})
export class BidsModule {}
