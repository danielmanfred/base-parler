import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import * as firebase from 'firebase/app';

import { ChatMessage } from './models/chat-message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  user: any
  chatMessages: AngularFireList<ChatMessage[]>
  chatMessage: ChatMessage
  userName: Observable<string>

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) { 
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        //this.user = auth
      }
    })
  }

  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp()
    const email = 'test@exemple.com' // this.user.email
    this.chatMessages = this.getMessages()
    let document: any = {
      message: msg,
      timeSent: timestamp,
      userName: 'test-user', //this.userName,
      email: email
    }
    this.chatMessages.push(document)

    console.log('Called sendMessage()!')
  }

  getMessages(): AngularFireList<ChatMessage[]> {
    // Query to create our message feed binding
    return this.db.list<ChatMessage[]>('messages', ref => ref.orderByKey().limitToLast(25))
  }

  getTimeStamp() {
    const now = new Date()
    const date = now.getUTCFullYear() + '/' + (now.getUTCMonth() + 1) + '/' + now.getUTCDate()
    const time = now.getUTCHours() + ':' + now.getUTCMinutes() + ':' + now.getUTCSeconds()
    return date + ' ' + time
  }
}
