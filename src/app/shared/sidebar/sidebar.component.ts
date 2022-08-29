import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {

  constructor(private gifService: GifsService) { }

  get history() {
    return this.gifService.history;
  }

  reSearch(item: string) {
    this.gifService.searchGifs(item);
  }

}
