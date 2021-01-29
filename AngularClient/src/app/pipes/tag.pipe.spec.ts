import { TodoItem } from '../domain';
import { TagPipe } from './tag.pipe';

describe('TagPipe', () => {
  const pipe = new TagPipe();
  const todos: TodoItem[] = [
    {title: 'title1', isDone: false, tags: ['tag1', 'tag2', 'tag4']},
    {title: 'title2', isDone: false, tags: ['tag2']},
    {title: 'title3', isDone: false, tags: ['tag3']},
    {title: 'title4', isDone: false, tags: ['tag4', 'tag1']}
  ];

  it('create an instance', () => {
    const pipe = new TagPipe();
    expect(pipe).toBeTruthy();
  });

  it('filters nulls', () => {
    expect(pipe.transform([], null)).toEqual([]);
  })

  it('filters by tags(1)', () => {
    const expected = [
      {title: 'title1', isDone: false, tags: ['tag1', 'tag2', 'tag4']},
      {title: 'title4', isDone: false, tags: ['tag4', 'tag1']}
    ]
  
    expect(pipe.transform(todos, ['tag1'])).toEqual(expected);
  })

  it('filters by tags(2)', () => {
    const expected = [
      {title: 'title1', isDone: false, tags: ['tag1', 'tag2', 'tag4']},
      {title: 'title4', isDone: false, tags: ['tag4', 'tag1']}
    ];
    
    expect(pipe.transform(todos, ['tag1', 'tag4'])).toEqual(expected);
  })

  it('filters by tags(3', () => {
    const expected = [
      {title: 'title3', isDone: false, tags: ['tag3']},
    ];

    expect(pipe.transform(todos, ['tag3'])).toEqual(expected);
  })
});
