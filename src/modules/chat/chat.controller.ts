import { Controller, Post, Body, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ChatService } from './chat.service';
import { ChatRequestDto } from './dto/chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private service: ChatService) {}

  /**
   * Streaming chat endpoint — returns text/event-stream.
   * Any authenticated user may call this.
   */
  @Post()
  chat(@Body() dto: ChatRequestDto, @Res() res: Response) {
    return this.service.streamChat(dto.messages, res);
  }
}
