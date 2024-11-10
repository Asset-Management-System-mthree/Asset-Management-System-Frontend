import { Component, AfterViewInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ChatService } from '../services/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: number;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div class="chatbot-container">
      <button class="chat-button" (click)="toggleChat()">
        <span *ngIf="!isOpen">💬</span>
        <span *ngIf="isOpen">✕</span>
      </button>

      <div class="chat-window" *ngIf="isOpen">
        <div class="chat-header">
          <h3>Chatbot</h3>
        </div>
        
        <div class="chat-messages" #scrollContainer>
          <div *ngFor="let message of messages" 
               class="message"
               [ngClass]="{'user-message': message.isUser, 'bot-message': !message.isUser}">
            {{ message.text }}
          </div>
        </div>

        <div class="chat-input">
          <input type="text" 
                 [(ngModel)]="userInput" 
                 (keyup.enter)="sendMessage()"
                 placeholder="Type a message..."
                 [disabled]="isLoading">
          <button (click)="sendMessage()" [disabled]="isLoading || !userInput.trim()">
            {{ isLoading ? 'Sending...' : 'Send' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements AfterViewInit {
  isOpen = false;
  messages: ChatMessage[] = [];
  userInput = '';
  isLoading = false;
  conversationKey = 'chatConversation';

  constructor(private chatService: ChatService) {}

  ngAfterViewInit() {
    // Load messages when the component is initialized (in case chatbot is open)
    this.loadConversation();
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.loadConversation();  // Load the conversation when the chatbot is opened
    }
  }

  sendMessage() {
    if (this.userInput.trim() && !this.isLoading) {
      const userMessage = this.userInput;
      this.addUserMessage(userMessage);
      this.userInput = '';
      this.isLoading = true;

      this.chatService.sendMessage(userMessage).subscribe({
        next: (response) => {
          this.addBotMessage(response);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Chat Error:', error.message);
          this.addBotMessage(error.message || 'Sorry, I encountered an error. Please try again.');
          this.isLoading = false;
        }
      });
    }
  }

  private addUserMessage(text: string) {
    const message: ChatMessage = { text, isUser: true, timestamp: Date.now() };
    this.messages.push(message);
    this.saveConversation();
  }

  private addBotMessage(text: string) {
    const message: ChatMessage = { text, isUser: false, timestamp: Date.now() };
    this.messages.push(message);
    this.saveConversation();
  }

  // Save the conversation to localStorage
  private saveConversation() {
    const filteredMessages = this.messages.filter((msg) => msg.timestamp >= (Date.now() - 10 * 60 * 1000)); // Filter messages from the last 10 minutes
    localStorage.setItem(this.conversationKey, JSON.stringify(filteredMessages));
  }

  // Load the conversation from localStorage
  private loadConversation() {
    const storedMessages = localStorage.getItem(this.conversationKey);
    if (storedMessages) {
      const messages: ChatMessage[] = JSON.parse(storedMessages);
      this.messages = messages.filter((msg) => msg.timestamp >= (Date.now() - 10 * 60 * 1000)); // Only last 10 minutes
    }
  }
}

