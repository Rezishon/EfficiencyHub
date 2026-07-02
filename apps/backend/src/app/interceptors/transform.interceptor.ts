import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { IResponseType } from '@riseof-website/shared-types';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, IResponseType<T>> {
  intercept(_: ExecutionContext, next: CallHandler): Observable<IResponseType<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          data: data,
        };
      }),
    );
  }
}
