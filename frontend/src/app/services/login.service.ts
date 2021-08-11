import { Injectable } from '@angular/core';
import { User } from 'src/app/models';
import { Subject } from 'rxjs';

/* mark our Login service class as available for dependency injection with @Injectable() annotation. */

@Injectable()
export class LoginService{

    user: User = {
      name:'',
      id:''
    };

    userChange: Subject<User> = new Subject<User>();

    constructor(){
      this.userChange.subscribe(value =>{
        this.user = value
      })
    }
  
    login(name = "",id = ""){      
      this.userChange.next({name: name, id: id})
    }
  
    logout(){
      this.userChange.next({name:'',id:''})
    }         
}
