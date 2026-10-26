import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/users.entity';

export enum AuctionStatus {
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}

@Entity('auctions')
export class Auction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ nullable: true })
  image_url: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  initial_price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  current_price: number;

  @Column({
    type: 'enum',
    enum: AuctionStatus,
    default: AuctionStatus.ACTIVE,
  })
  status: AuctionStatus;

  @Column({ nullable: true })
  external_product_id: number;

  // Relacionamento: Pertence a um Leiloeiro (User)
  @Column()
  leiloeiro_id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'leiloeiro_id' })
  leiloeiro: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}