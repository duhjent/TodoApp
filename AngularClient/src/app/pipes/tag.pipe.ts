import { Pipe, PipeTransform } from '@angular/core';
import { TodoItem } from '../domain';

@Pipe({
  name: 'tag'
})
export class TagPipe implements PipeTransform {

  transform(items: TodoItem[], requiredTags: string[]): TodoItem[] {
    if (!items) return [];
    if (!requiredTags) return items;
    if (requiredTags.length < 1) return items;

    return items.filter(val => {
      let doesContain = true;
      requiredTags.forEach(tag => doesContain &&= val.tags.includes(tag));
      return doesContain;
    });
  }

}
