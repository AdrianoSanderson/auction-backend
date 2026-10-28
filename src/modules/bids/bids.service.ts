import { Injectable, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Bid } from './bid.entity';
import { User, UserRole } from '../users/users.entity';
import { Auction } from '../auctions/auctions.entity';

@Injectable()
export class BidsService {
  constructor(
    @InjectRepository(Bid)
    private bidsRepository: Repository<Bid>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Auction)
    private auctionsRepository: Repository<Auction>,
    private dataSource: DataSource,
  ) {}

  async createBid(userId: string, auctionId: string, amount: number) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuário não encontrado.');

    if (user.role !== UserRole.LICITANTE) {
      throw new ForbiddenException('Apenas licitantes podem realizar lances.');
    }

    const auction = await this.auctionsRepository.findOne({ where: { id: auctionId } });
    if (!auction) throw new NotFoundException('Lote não encontrado.');

    if (amount <= Number(auction.current_price)) {
      throw new BadRequestException('O valor do lance deve ser maior que o preço atual do lote.');
    }

    const saldoLivre = Number(user.balance_total) - Number(user.balance_committed);
    if (saldoLivre < amount) {
      throw new BadRequestException('Saldo livre insuficiente na carteira para este lance.');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const bid = this.bidsRepository.create({
        user_id: userId,
        auction_id: auctionId,
        amount,
      });
      await queryRunner.manager.save(bid);

      auction.current_price = amount;
      await queryRunner.manager.save(auction);

      user.balance_committed = Number(user.balance_committed) + Number(amount);
      await queryRunner.manager.save(user);

      await queryRunner.commitTransaction();
      return bid;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('Erro ao processar o lance. Tente novamente.');
    } finally {
      await queryRunner.release();
    }
  }

  async findByAuction(auctionId: string) {
    return this.bidsRepository.find({
      where: { auction_id: auctionId },
      order: { created_at: 'DESC' },
      relations: { user: true },
    });
  }
}