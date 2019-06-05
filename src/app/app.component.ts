import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  todoListTasks: any = [];
  showCardDetails: any = false;
  cardDesc: any;
  currentDate: any = new Date();
  currentList: number;
  currentCard: number;
  cardTitle: any;
  cardComment: any;
  isAddCard: any = false;
  isUpdateCard: any = false;
  cardComments: any = [];
  dropList(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.todoListTasks, event.previousIndex, event.currentIndex);
  }

  dropCard(event: CdkDragDrop<string[]>, index) {
    moveItemInArray(this.todoListTasks[index].cards, event.previousIndex, event.currentIndex);
  }

  createList() {
    this.todoListTasks.push({ cardName: 'List ' + this.todoListTasks.length, cards: [] });
  }

  deleteList(index) {
    this.todoListTasks.splice(index, 1);
  }

  addNewCard(index) {
    this.showCardDetails = true;
    this.isAddCard = true;
    this.currentList = index;
    this.cardTitle = '';
    this.cardComment = '';
    this.cardComments = [];
  }

  deleteCard() {
    this.showCardDetails = false;
    this.todoListTasks[this.currentList].cards.splice(this.currentCard, 1);
    this.isUpdateCard = false;
    this.isAddCard = false;
  }

  addCard() {
    if (this.cardTitle) {
      this.showCardDetails = false;
      if (this.isAddCard) {
        this.isAddCard = false;
        this.todoListTasks[this.currentList].cards.push({
          cardTitle: this.cardTitle,
          cardComments: this.cardComments
        });
      } else {
        this.isUpdateCard = false;
        this.todoListTasks[this.currentList].cards[this.currentCard] = {
          cardTitle: this.cardTitle,
          cardComments: this.cardComments
        };
      }
    } else {
      alert('Please enter card title');
    }
}

updateCard(index, innerIndex) {
  this.showCardDetails = true;
  this.isUpdateCard = true;
  this.currentList = index;
  this.currentCard = innerIndex;
  this.cardTitle = this.todoListTasks[index].cards[innerIndex].cardTitle;
  this.cardComments = this.todoListTasks[index].cards[innerIndex].cardComments;
  this.cardComment = '';
}

addComment() {
  if (this.cardComment) {
    this.cardComments.push(this.cardComment);
    this.cardComment = '';
  } else {
    alert('Please enter comments');
  }
}

}
