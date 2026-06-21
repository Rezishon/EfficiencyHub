import { NotFoundException } from '@nestjs/common';

export function HasValue(value: unknown, searchedValue?: unknown) {
  if (value === null || value === undefined) {
    throw new NotFoundException(`The '${searchedValue ? searchedValue : value}' was not found.`);
  }
}
