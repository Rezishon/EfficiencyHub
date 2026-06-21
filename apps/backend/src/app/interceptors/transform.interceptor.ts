import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ResponseType } from '../response-type/response-type.dto';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ResponseType<T>> {
  intercept(_: ExecutionContext, next: CallHandler): Observable<ResponseType<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          data: data,
        };
      }),
    );
  }
}
