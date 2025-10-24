import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImage } from './';
import { User } from 'src/auth/entities/user.entity';

@Entity({ name: 'products' })
export class Product {
  @ApiProperty({
    example: '28f0d8e0-bef1-40b7-a5b3-07923f3be5b2',
    description: 'Product ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'T-Shirt Teslo',
    description: 'Product title',
    uniqueItems: true,
  })
  @Column('text', {
    unique: true,
  })
  title: string;

  @ApiProperty({
    example: 0,
    description: 'Product price'
  })
  @Column('float', {
    default: 0,
  })
  price: number;

  @ApiProperty(({
    example: 'anim sanfand sasndsw iurere bilsdaowwei',
    description: 'Product description',
    default: null
  }))
  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @ApiProperty(({
    example: 't_shirt_teslo',
    description: 'Product SLUG - for SEO',
    uniqueItems: true
  }))
  @Column('text', {
    unique: true,
  })
  slug: string;

  @ApiProperty(({
    example: 10,
    description: 'Product stock',
    default: 0
  }))
  @Column('int', {
    default: 0,
  })
  stock: number;

  @ApiProperty(({
    example: ['M', 'XL', 'XXL'],
    description: 'Product sizes',
  }))
  @Column('text', {
    array: true,
  })
  sizes: string[];

  @ApiProperty(({
    example: 'women',
    description: 'Product gender',
  }))
  @Column('text')
  gender: string;

  @ApiProperty()
  @Column('text', {
    array: true,
    default: [],
  })
  tags: string[];

  //images
  @ApiProperty()
  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

  @ManyToOne(() => User, (user) => user.product, { eager: true })
  user: User;

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }

    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
}
