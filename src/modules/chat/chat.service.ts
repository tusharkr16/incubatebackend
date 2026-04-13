import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Anthropic from '@anthropic-ai/sdk';
import { Response } from 'express';
import { ChatMessageDto } from './dto/chat.dto';

const SYSTEM_PROMPT = `You are GrantsGPT, an expert grant consultant at IncubatX — an Indian startup incubator. Your role is to help founders, incubator staff, and investors navigate Indian government grants, eligibility criteria, application processes, documentation requirements, and funding strategy.

You have deep expertise in the following schemes and more:
- Startup India Seed Fund Scheme (SISFS) — DPIIT, ₹20L–₹5Cr
- BIRAC BIG Grant — Biotechnology, up to ₹50L
- NIDHI-PRAYAS — DST, up to ₹10L, prototype development
- Atal Innovation Mission (AIM) — NITI Aayog, ₹10L–₹10Cr
- TIDE 2.0 — MeitY, up to ₹75L, ICT/AI/IoT startups
- Stand-Up India — SIDBI, ₹10L–₹1Cr, SC/ST and women entrepreneurs
- MSME Champions Scheme — Ministry of MSME, subsidies and credit
- PMMY Mudra Yojana — up to ₹20L, micro/small enterprises
- Various state-level schemes, DPIIT recognition, Udyam registration

Guidelines:
- Answer clearly and concisely. Use bullet points for eligibility criteria or steps.
- Always mention the official portal URL when relevant.
- If a startup does not meet eligibility, tell them honestly and suggest alternatives.
- For complex legal or financial questions, recommend consulting a CA or legal advisor.
- Use ₹ for rupee amounts. Format amounts clearly (e.g., ₹50L, ₹1Cr).
- Keep responses focused — do not go beyond grants, startup funding, and incubation topics.
- Be warm and encouraging — founders are often first-time applicants navigating complex government systems.`;

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);
  private readonly anthropic: Anthropic;
  private readonly enabled: boolean;

  constructor(private config: ConfigService) {
    const apiKey = this.config.get<string>('ANTHROPIC_API_KEY');
    this.enabled = !!apiKey;
    if (this.enabled) {
      this.anthropic = new Anthropic({ apiKey });
      this.logger.log('Claude (Anthropic) chat enabled');
    } else {
      this.logger.warn('ANTHROPIC_API_KEY not set — chat will return a placeholder');
    }
  }

  async streamChat(messages: ChatMessageDto[], res: Response): Promise<void> {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');

    if (!this.enabled) {
      res.write(`data: ${JSON.stringify({ text: 'GrantsGPT is not configured yet. Please ask the admin to add the ANTHROPIC_API_KEY.' })}\n\n`);
      res.write('data: [DONE]\n\n');
      res.end();
      return;
    }

    try {
      const stream = await this.anthropic.messages.stream({
        model: 'claude-3-5-haiku-20241022',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
      });

      for await (const event of stream) {
        if (
          event.type === 'content_block_delta' &&
          event.delta.type === 'text_delta'
        ) {
          res.write(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`);
        }
      }

      res.write('data: [DONE]\n\n');
      res.end();
    } catch (err) {
      this.logger.error('Claude stream error', err);
      res.write(`data: ${JSON.stringify({ error: 'An error occurred. Please try again.' })}\n\n`);
      res.write('data: [DONE]\n\n');
      res.end();
    }
  }
}
