// Import stylesheets
import './style.css';
import { Observable } from 'rxjs';
import { of, from, fromEvent } from 'rxjs';
import { tap, map } from 'rxjs/operators';





// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;

const progressBar$ = Observable.create(observer => {
  const OFFSET = 3000;
  const SPEED = 50;
  let val = 0;
  function progress() {
    if (++val <= 100) {
      observer.next(val);
      setTimeout(progress, SPEED);
    }
    else {
      observer.complete();
    }
  };
  setTimeout(progress, OFFSET);
});

const label = document.querySelector('#progress-indicator');
progressBar$
  .subscribe(
    val => label.textContent = (Number.isInteger(val) ? val + "%" : val),
    error => console.log(error.message),
    () => label.textContent = 'Complete!'
  );

const addSixPercent = x => x + (x * .06);
const source$ = of(10.0, 20.0, 30.0, 40.0);
source$.pipe(map(addSixPercent))
  .subscribe(console.log); //-> 10.6, 21.2, 31.8, 42.4 

/** Escuchando eventos clik del mause y suscribiendonos a los mismo */
const click$ = fromEvent(document, 'click');
click$
  .pipe(
    map(event => ({
      x: event.clientX,
      y: event.clientY
    }))
    // { x: 12, y: 45 }, { x: 23, y: 132 }
  ).subscribe(console.log);

/** Escuchando eventos keyup y subscribiendonos a la respuesta*/
const keyup$ = fromEvent(document, 'keyup');

keyup$
  .pipe(map(event => event.code))
  // 'Space', 'Enter'
  .subscribe(console.log);