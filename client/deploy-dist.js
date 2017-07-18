const path = require("path");
const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs-extra"));
main(...process.argv);
function main(a, b, ...rest) {
    const options = {};
    for (let option of rest) {
        try {
            let [key, value] = option.split("=");
            options[key] = value;
        } catch (e) {
            console.log(e);
        }
    }
    const {from, to, templates} = options;
    moveDir(from, to, ...[{
        test: /templates$/,
        to: templates
    }]);
}

function moveDir(from, to, ...curs) {
    fs.readdirAsync(from).then(function (list) {
        list.forEach(function (name) {
            const filename = path.resolve(from, name);
            let fileTo;
            for (let c of curs) {
                if (filename.match(c.test)) {
                    moveDir(filename, c.to);
                    return;
                }
            }
            fileTo = path.resolve(to, name);
            move(filename, fileTo);

        });
    });
}

function move(from, to) {
    console.log(from, " to ", to);
    fs.copy(from, to, {overwrite: true}, err => {
        if (err) {
            return console.error(err);
        }
    });
}
