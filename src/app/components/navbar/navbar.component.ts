import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  search?: string;

  constructor() { }

  ngOnInit(): void {
  }

  handleSearch() {
    console.log('PESQUISA:', this.search);
    this.search = undefined;
    
  }
}
