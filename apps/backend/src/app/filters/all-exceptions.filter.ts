import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ConflictException,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { Prisma } from '../../../prisma/generated/prisma/client';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(error: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    try {
      if (error instanceof HttpException) {
        throw error;
      }

      if (error instanceof NotFoundException) {
        throw new NotFoundException('An error occurred while updating your list.');
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2002':
            throw new ConflictException(`The list name already exists.`);

          case 'P2025':
            throw new NotFoundException(`The requested record was not found.`);

          case 'P2003':
            throw new BadRequestException(
              `Foreign key constraint failed. A related record is missing.`,
            );

          case 'P2000':
            throw new BadRequestException(
              `The provided data exceeds the allowed column size limit.`,
            );

          default:
            throw new InternalServerErrorException(`Database error code: ${error.code}`);
        }
      }

      throw new InternalServerErrorException(error.message);
    } catch (mappedException: any) {
      const status = mappedException.getStatus();
      const responseBody = mappedException.getResponse();

      response
        .status(status)
        .json(
          typeof responseBody === 'object'
            ? responseBody
            : { statusCode: status, message: responseBody },
        );
    }
  }
}
