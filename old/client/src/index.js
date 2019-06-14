import renderApp from "./renderApp";
import $ from "jquery";
import md5 from "blueimp-md5";
import { b64DecodeUnicode } from "./utils/b64";

$(document).ready(function () {
    if (md5(eval(b64DecodeUnicode("d2luZG93LmxvY2F0aW9uLmhvc3RuYW1l"))) === SERVICE_URL) {
        const $div = $("<div>", {id: "sited"});
        $div.prependTo($("body"));
        renderApp($div[0]);
        $div.replaceWith(function () {
            return $div.children();
        });
    }
});
