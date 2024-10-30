import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import AOS from 'aos';
import 'aos/dist/aos.css';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit, AfterViewInit {

  @ViewChild('teamCarousel', { static: false }) carouselElementRef!: ElementRef;

  teamMembers = [
    
    { name: 'Ahmed Ali', position: 'Head of Technology', imageUrl: './300-1.jpg' },
    { name: 'Mona Samy', position: 'Lead UX/UI Designer', imageUrl: './300-2.jpg' },
    { name: 'Hossam Rami', position: 'Operations Manager', imageUrl: './300-3.jpg' },
    { name: 'Fatima Zohra', position: 'Data Analyst', imageUrl: './300-4.jpg' },
    { name: 'Omar Mohamed', position: 'Marketing Strategist', imageUrl: './300-5.jpg' },
    { name: 'Sara Ahmed', position: 'Customer Support Lead', imageUrl: './300-6.jpg' }
  ];

  slides: any[][] = [];
  currentIndex = 0;
  totalSlides = 0;
  membersPerSlide = 3;

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      AOS.init({duration: 200, // تقليل مدة الرسوم المتحركة
        once: true,}); // Initialize AOS if in the browser
    }
    this.createSlides();
    
  }

  ngAfterViewInit(): void {
    this.updateCarousel(); // Update carousel after the view is initialized
  }

  createSlides() {
    this.slides = [];
    const length = this.teamMembers.length;
    for (let i = 0; i < length; i += this.membersPerSlide) {
      this.slides.push(this.teamMembers.slice(i, i + this.membersPerSlide));
    }
    this.totalSlides = this.slides.length;
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
    if (this.currentIndex === 0) {
      this.rotateMembers();
      this.createSlides(); // Recreate slides after rotation
    }
    this.updateCarousel();
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    if (this.currentIndex === this.totalSlides - 1) {
      this.rotateMembers();
      this.createSlides(); // Recreate slides after rotation
    }
    this.updateCarousel();
  }

  rotateMembers() {
    const length = this.teamMembers.length;
    const shiftCount = 1; // Rotate by one position
    const rotatedMembers = [
      ...this.teamMembers.slice(shiftCount),
      ...this.teamMembers.slice(0, shiftCount)
    ];
    this.teamMembers = rotatedMembers;
    this.createSlides(); // Recreate slides after rotation
  }

  updateCarousel() {
    if (typeof window !== 'undefined' && this.carouselElementRef) {
      const carouselElement = this.carouselElementRef.nativeElement;
      const items = carouselElement.querySelectorAll('.carousel-item');
      items.forEach((item: Element, index: number) => {
        item.classList.toggle('active', index === this.currentIndex);
      });
    }
  }
}
