import { Component, OnInit } from '@angular/core';
import { NewapiService } from './newapi.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitWords',
})
export class LimitWordsPipe implements PipeTransform {
  transform(value: string, limit: number): string {
    if (!value) return '';

    const words = value.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }
    return value;
  }
}

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
      // console.log(this.topHeadlinesData);
    });
  }
}
