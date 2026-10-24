import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum UserRole {
  LEILOEIRO = 'LEILOEIRO',
  LICITANTE = 'LICITANTE',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ select: false }) // Oculta a senha por segurança nas consultas
  password_hash: string;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;

  // Campos da carteira do licitante (o leiloeiro pode ter zeros ou ignorar)
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  balance_total: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  balance_committed: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}