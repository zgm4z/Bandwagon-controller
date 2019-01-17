import {Pipe, PipeTransform} from '@angular/core';


@Pipe({
  name: 'byteToOther'
})
export class ByteUperPipe implements PipeTransform {
  constructor() {
  }

  transform(bytes: number, args: string): number {
    switch (args) {
      case 'GB': {
        return Number((bytes / 1024 / 1024 / 1024).toFixed(2));
      }
      case 'MB': {
        return Number((bytes / 1024 / 1024).toFixed(2));
      }
      case 'KB': {
        return Number((bytes / 1024).toFixed(2));
      }
    }
  }

}
