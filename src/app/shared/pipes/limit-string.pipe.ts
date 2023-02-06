import { Pipe } from '@angular/core';

@Pipe({ name: 'limitString' })
export class LimitStringPipe {
    transform(text: string, length: number): string {
        if (text?.length > length) {
            return text.substring(0, length) + '...';
        } else {
            return text;
        }
    }
}