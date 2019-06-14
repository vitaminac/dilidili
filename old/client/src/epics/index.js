import { Subject } from "rxjs";

export default function wrapperDispatch(dispatch, transforms) {
    const subject = new Subject();
    const subscription = transforms(subject).subscribe((action) => {
        dispatch(action);
    });
    return (action) => {
        subject.next(action);
    };
}
