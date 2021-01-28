import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { Tag } from "./tag.actions";

export interface TagListStateModel {
  tagList: string[];
}

@State<TagListStateModel>({
  name: 'tags',
  defaults: {
    tagList: []
  }
})
@Injectable()
export class TagListState {
  constructor(private http: HttpClient) { }

  @Action(Tag.FetchAll)
  fetchTags(ctx: StateContext<TagListStateModel>) {
    // return this.http.get<string[]>
  }
}