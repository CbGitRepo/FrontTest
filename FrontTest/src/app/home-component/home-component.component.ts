import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})

export class HomeComponentComponent implements OnInit {
  slideIndex  = 0;

  constructor() { }
  
   showSlides(): void {
      var i;
      var slides = document.getElementsByClassName("mySlides");
      var dots = document.getElementsByClassName("dot");
      
      this.slideIndex++;
      if (this.slideIndex > slides.length) {this.slideIndex = 1}    
      for (i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(" active", "");
      }
      //slides[this.slideIndex-1].style.display = "block";  
      dots[this.slideIndex-1].className += " active";
      setTimeout(this.showSlides, 2000); // Change image every 2 seconds
  }
  ngOnInit() {
  }

}
