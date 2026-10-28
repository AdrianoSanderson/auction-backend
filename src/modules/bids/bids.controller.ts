import { Controller, Post, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BidsService } from './bids.service';

@Controller('bids')
export class BidsController {
  constructor(private readonly bidsService: BidsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createBid(
    @Request() req,
    @Body('auctionId') auctionId: string,
    @Body('amount') amount: number,
  ) {
    return this.bidsService.createBid(req.user.userId, auctionId, Number(amount));
  }

  @Get('auction/:auctionId')
  getBidsByAuction(@Param('auctionId') auctionId: string) {
    return this.bidsService.findByAuction(auctionId);
  }
}