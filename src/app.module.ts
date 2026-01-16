import { Module } from '@nestjs/common';
import { EstoqueModule } from './estoque/estoque.module';

@Module({
  imports: [EstoqueModule],
})
export class AppModule {}
