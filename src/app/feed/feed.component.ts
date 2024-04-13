import { Component, OnInit } from '@angular/core';
import { NewapiService } from './newapi.service';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent implements OnInit {
  topHeadlinesData: any = [];
  constructor(private api: NewapiService) {}
  ngOnInit(): void {
    this.api.tcHeadlines().subscribe((result) => {
      this.topHeadlinesData = result.articles;
    });
  }
}
