import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auction, AuctionStatus } from './auctions.entity';

@Injectable()
export class AuctionsService {
  constructor(
    @InjectRepository(Auction)
    private readonly auctionRepository: Repository<Auction>,
  ) {}

  // 1. Busca produtos na API externa (DummyJSON) para o leiloeiro escolher
  async searchExternalProducts(query?: string) {
    const url = query
      ? `https://dummyjson.com/products/search?q=${query}`
      : `https://dummyjson.com/products?limit=10`;

    const response = await fetch(url);
    const data = await response.json();

    return data.products;
  }

  // 2. Cria um novo lote utilizando os dados da API externa
  async createAuction(leiloeiroId: string, externalProductId: number, customInitialPrice?: number) {
    const response = await fetch(`https://dummyjson.com/products/${externalProductId}`);
    if (!response.ok) {
      throw new NotFoundException('Produto não encontrado na API externa.');
    }
    const product = await response.json();

    const price = customInitialPrice || product.price;

    const auction = this.auctionRepository.create({
      title: product.title,
      description: product.description,
      image_url: product.thumbnail || product.images?.[0],
      initial_price: price,
      current_price: price,
      status: AuctionStatus.ACTIVE,
      external_product_id: product.id,
      leiloeiro_id: leiloeiroId,
    });

    return await this.auctionRepository.save(auction);
  }

  // 3. Lista todos os leilões ativos/cadastrados para a vitrine
  async findAll() {
    return await this.auctionRepository.find({
      relations: {
        leiloeiro: true,
      },
      order: { created_at: 'DESC' },
    });
  }

  // 4. Busca um lote específico por ID
  async findOne(id: string) {
    const auction = await this.auctionRepository.findOne({
      where: { id },
      relations: {
        leiloeiro: true,
      }
    });

    if (!auction) {
      throw new NotFoundException('Lote não encontrado.');
    }

    return auction;
  }
}