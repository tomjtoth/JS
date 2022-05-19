const evilParent = /\(([^()]+)\)/;
const evilNumber = `(?:\\d*\\.)?\\d+`;

const evilPower = new RegExp(`(${evilNumber})\\^(${evilNumber})`);
const evilMulDiv = new RegExp(`(${evilNumber})([/*])(${evilNumber})`);
const evilAddSub = new RegExp(`(${evilNumber})([-+])(${evilNumber})`);

function evilMath(x) {
    function recurse(x) {
        // resolve all parenthesed groups from smalles to largest
        while (evilParent.test(x)) {
            x = x.replace(evilParent, (m, p1) => recurse(p1));
        }

        // resolve all power operations
        while (evilPower.test(x)) {
            x = x.replace(evilPower, (m, p1, p2) => Math.pow(p1, p2));
        }

        // resolve all multiplication and divison
        while (evilMulDiv.test(x)) {
            x = x.replace(evilMulDiv, (m, p1, p2, p3) => p2 == "*"
                ? Number(p1) * Number(p3)
                : Number(p1) / Number(p3)
            );
        }

        // resolve all addition and subtraction
        while (evilAddSub.test(x)) {
            x = x.replace(evilAddSub, (m, p1, p2, p3) => p2 == "+"
                ? Number(p1) + Number(p3)
                : Number(p1) - Number(p3)
            );
        }

        return x
    }
    
    return Number(recurse(x

        // adjust decimal separators and remove whitespace
        .replaceAll(",", ".").replaceAll(" ", "")

        // numbers or parents next to other parents. are to be multiplied
        .replace(/(?<=\d)(?=\()|(?<=\))(?=\()|(?<=\))(?=\d)/g, "*")
    ))

}

// EXPORTS BELOW
exports.evilMath = evilMath
