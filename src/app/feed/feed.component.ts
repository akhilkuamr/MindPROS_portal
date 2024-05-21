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
  filteredData: any = [];
  newPostContent: any = [];
  isPostsTabActive: boolean = true;
  isImagesTabActive: boolean = false;
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  constructor(private api: NewapiService) {}
  ngOnInit(): void {
    this.loadTopHeadlines();
  }

  loadTopHeadlines(): void {
    this.api.tcHeadlines().subscribe((result) => {
      this.totalItems = result.articles.length;
      this.topHeadlinesData = result.articles
        .filter((item: any) => item.author !== null)
        .slice(
          (this.currentPage - 1) * this.pageSize,
          this.currentPage * this.pageSize
        );
    });
  }

  nextPage(): void {
    if (this.currentPage * this.pageSize < this.totalItems) {
      this.currentPage++;
      this.loadTopHeadlines();
    }
    document.getElementById('top').scrollIntoView();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadTopHeadlines();
    }
    document.getElementById('top').scrollIntoView();
  }

  handleTabClick(tab: string) {
    if (tab === 'posts') {
      this.isPostsTabActive = true;
      this.isImagesTabActive = false;
    } else if (tab === 'images') {
      this.isPostsTabActive = false;
      this.isImagesTabActive = true;
    }
  }

  addnews() {
    // console.log(this.newPostContent);
    if (
      this.newPostContent.title.trim() !== '' &&
      this.newPostContent.content.trim() !== ''
    ) {
      this.topHeadlinesData.unshift({
        author: 'You',
        publishedAt: new Date().toISOString(),
        title: this.newPostContent.title,
        content: this.newPostContent.content,
      });

      this.newPostContent = '';
    }
  }
}
