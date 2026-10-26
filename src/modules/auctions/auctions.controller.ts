import { Controller, Get, Post, Body, Param, Query, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { AuctionsService } from './auctions.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('auctions')
export class AuctionsController {
  constructor(private readonly auctionsService: AuctionsService) {}

  @Get('external-products')
  async getExternalProducts(@Query('q') query?: string) {
    return await this.auctionsService.searchExternalProducts(query);
  }

  @Get()
  async findAll() {
    return await this.auctionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.auctionsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Req() req,
    @Body() body: { externalProductId: number; initialPrice?: number },
  ) {

    const user = req.user;

    if (user.role !== 'LEILOEIRO') {
      throw new ForbiddenException('Apenas usuários com o perfil de Leiloeiro podem cadastrar lotes.');
    }

    return await this.auctionsService.createAuction(
      user.userId,
      body.externalProductId,
      body.initialPrice,
    );
  }
}