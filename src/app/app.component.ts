import {Component} from '@angular/core';
import {DemoService} from './demo.service';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  user_name = 10;

  public users;
  user = {};

  constructor(private _demoService: DemoService) { }

  ngOnInit() {
    this.getFoods();
  }

  getFoods() {
    this._demoService.getFoods().subscribe(
      // the first argument is a function which runs on success
      data => { this.users = data},
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('done loading foods')
    );
  }

  // getBooksAndMovies() {
  //   this._demoService.getBooksAndMovies().subscribe(
  //     data => {
  //       this.books = data[0]
  //       this.movies = data[1]
  //     }
  //     // No error or completion callbacks here. They are optional, but
  //     // you will get console errors if the Observable is in an error state.
  //   );
  // }

  createFood(name) {
    let user = {name: name};
    this._demoService.createFood(user).subscribe(
       data => {
         // refresh the list
         this.getFoods();
         return true;
       },
       error => {
         console.error("Error saving food!");
         return Observable.throw(error);
       }
    );
  }

  updateFood(user) {
    this._demoService.updateFood(user).subscribe(
       data => {
         // refresh the list
         this.getFoods();
         return true;
       },
       error => {
         console.error("Error saving food!");
         return Observable.throw(error);
       }
    );
  }

  deleteFood(user) {
    if (confirm("Are you sure you want to delete " + user.name + "?")) {
      this._demoService.deleteFood(user).subscribe(
         data => {
           // refresh the list
           this.getFoods();
           return true;
         },
         error => {
           console.error("Error deleting food!");
           return Observable.throw(error);
         }
      );
    }
  }
}
