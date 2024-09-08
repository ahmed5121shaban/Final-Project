import { Component } from '@angular/core';

@Component({
  selector: 'app-faq-rules',
  templateUrl: './faq-rules.component.html',
  styleUrls: ['./faq-rules.component.css']
})
export class FaqRulesComponent {
  searchTerm: string = '';
  selectedCategory: string = '';
  isOpenMap = new Map<string, boolean>();
  categories = [
    {
      name: 'Products',
      questions: [
        { question: 'What types of products are auctioned?', answer: 'We auction a variety of products including electronics, furniture, and more.' },
        { question: 'Are there any restrictions on the products?', answer: 'Yes, some products may be restricted based on local laws.' },
        { question: 'Can I see the product before bidding?', answer: 'Yes, detailed descriptions and photos are provided.' },
        { question: 'How do I know if a product is genuine?', answer: 'We ensure authenticity through verified sources and descriptions.' }
      ]
    },
    {
      name: 'Security',
      questions: [
        { question: 'How is my data protected?', answer: 'We use encryption to protect your data.' },
        { question: 'What should I do if I suspect a security issue?', answer: 'Contact our support team immediately.' },
        { question: 'Do you store my payment information?', answer: 'Payment information is processed securely and not stored.' },
        { question: 'Are there measures against fraud?', answer: 'Yes, we employ various fraud detection systems.' }
      ]
    },
    {
      name: 'Billing',
      questions: [
        { question: 'What payment methods are accepted?', answer: 'We accept all major credit cards and PayPal.' },
        { question: 'Is there a fee for using a credit card?', answer: 'No, there are no additional fees for credit card payments.' },
        { question: 'Can I get a refund if I change my mind?', answer: 'Refunds are subject to our auction policies.' },
        { question: 'How do I view my transaction history?', answer: 'You can view your transaction history in your account settings.' }
      ]
    }
  ];

  get filteredQuestions() {
    if (this.selectedCategory) {
      const category = this.categories.find(c => c.name === this.selectedCategory);
      if (category) {
        return category.questions.filter(q => q.question.toLowerCase().includes(this.searchTerm.toLowerCase()));
      }
    } else {
      return this.categories.flatMap(c => c.questions).filter(q => q.question.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }
    return [];
  }

  selectCategory(category: any) {
    this.selectedCategory = category.name;
  }

  toggleAnswer(question: any) {
    this.isOpenMap.set(question.question, !this.isOpen(question));
  }

  isOpen(question: any) {
    return this.isOpenMap.get(question.question) || false;
  }
}
