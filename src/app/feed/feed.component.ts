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
  newPostContent: any = [];
  constructor(private api: NewapiService) {}
  ngOnInit(): void {
    this.api.tcHeadlines().subscribe((result) => {
      this.topHeadlinesData = result.articles;
    });
  }

  addnews() {
    console.log(this.newPostContent);
    if (
      this.newPostContent.title.trim() !== '' &&
      this.newPostContent.content.trim() !== ''
    ) {
      // Add the new post to the beginning of the news feed
      this.topHeadlinesData.unshift({
        author: 'You', // Set the author to 'You' or any desired value
        publishedAt: new Date().toISOString(), // Set the current date and time
        title: this.newPostContent.title, // Set a default title or customize as needed
        content: this.newPostContent.content, // Use the new post content entered by the user
      });

      // Clear the new post content after adding the post
      this.newPostContent = '';
    }
  }
}
