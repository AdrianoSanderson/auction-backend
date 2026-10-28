import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/users.entity';
import { Auction } from '../auctions/auctions.entity';

@Entity('bids')
export class Bid {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column()
  user_id: string;

  @Column()
  auction_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Auction)
  @JoinColumn({ name: 'auction_id' })
  auction: Auction;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;
}