import { Observable } from "rxjs";

function scrollUpDown(input) {
    let lastScrollTop = 0;
    let currentScrollTop = 0;
    return Observable.create(
        function subscribe(observer) {
            observer.next("up");
            input.subscribe(function (event) {
                currentScrollTop = event.target.scrollTop;
                observer.next(currentScrollTop < lastScrollTop ? "up" : "down");
                lastScrollTop = currentScrollTop;
            });
        }
    ).distinctUntilChanged();
}

export default scrollUpDown;
