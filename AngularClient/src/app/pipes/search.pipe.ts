import { Pipe, PipeTransform } from '@angular/core';
import { TodoItem } from '../domain';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: TodoItem[], searchTerm: string): TodoItem[] {
    if (!items) return [];
    if (!searchTerm) return items;
    
    return items.filter(val => val.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }

}
