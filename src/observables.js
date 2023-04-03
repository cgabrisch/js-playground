import { of, tap, map, catchError } from 'rxjs';
import { ajax } from 'rxjs/ajax';

export function testObservables() {
  of('cgabrisch').pipe(
    tap(x => console.log('About to fetch Github user : %O', x)),
    map(x => fetchGithubUser(x)),
    tap(x => console.log('Tap 2: %O', x))
  ).subscribe(x => console.log('Subscription: %O', x));
}

function fetchGithubUser(user) {
  return ajax(`http://api.github.com/users/${user}`).pipe(
      map(userResponse => console.log('users: ', userResponse)),
      catchError(error => {
        console.log('error: ', error);
        return of(error);
      })
    )
}
     
