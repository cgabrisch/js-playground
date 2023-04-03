import { of, tap, mergeMap } from 'rxjs';
import { ajax } from 'rxjs/ajax';

export function testObservables() {
  of('cgabrisch').pipe(
    tap(x => console.log('About to fetch Github user : %O', x)),
    mergeMap(x => githubUserRequest(x)),
    tap(x => console.log('Fetched user: %O', x.login ))
  ).subscribe({
      next: x => console.log('Github user JSON: %O', JSON.stringify(x)),
      error: error => console.log('Caught error when fetching Github user: ', error)
  });
}

function githubUserRequest(user) {
  return ajax.getJSON(`http://api.github.com/users/${user}`);
}
