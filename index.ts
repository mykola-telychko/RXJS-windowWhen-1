import { interval, timer } from 'rxjs';
import { windowWhen, tap, mergeAll } from 'rxjs/operators';

// https://www.learnrxjs.io/learn-rxjs/operators/transformation/windowwhen
// Example 1: Open and close window at interval

//emit immediately then every 1s
const source = timer(0, 1000);
const example = source.pipe(
  //close window every 5s and emit observable of collected values from source
  windowWhen(() => interval(5000)),
  tap((_) => console.log('NEW WINDOW!'))
);

const subscribeTwo = example
  .pipe(
    //window emits nested observable
    mergeAll()
  )
  .subscribe((val) => console.log(val));
/*
      output:
      "NEW WINDOW!"
      0
      1
      2
      3
      4
      "NEW WINDOW!"
      5
      6
      7
      8
      9
*/
