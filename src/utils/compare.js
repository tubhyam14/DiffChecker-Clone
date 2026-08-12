import { diff_match_patch } from "diff-match-patch";

const dmp = new diff_match_patch();

/*
 * Convert lines into unique characters.
 * This allows diff-match-patch to compare
 * the text line-by-line.
 */
function linesToChars(leftLines, rightLines) {
    const lineToChar = new Map();
    const charToLine = [];

    function encode(lines) {
        let result = "";

        for (const line of lines) {

            if (!lineToChar.has(line)) {

                const char = String.fromCharCode(
                    charToLine.length
                );

                lineToChar.set(line, char);
                charToLine.push(line);
            }

            result += lineToChar.get(line);
        }

        return result;
    }

    return {
        leftChars: encode(leftLines),
        rightChars: encode(rightLines),
        charToLine
    };
}


/*
 * Convert the character-based diff back
 * into actual lines.
 */
function charsToLines(diffs, charToLine) {

    return diffs.map(([operation, chars]) => {

        const lines = [];

        for (let i = 0; i < chars.length; i++) {

            lines.push(
                charToLine[
                    chars.charCodeAt(i)
                ]
            );

        }

        return {
            operation,
            lines
        };
    });
}


/*
 * Character-level comparison.
 *
 * Used when two corresponding lines
 * have been modified.
 */
export function compareCharacters(leftText, rightText) {

    const diffs = dmp.diff_main(
        leftText,
        rightText
    );

    dmp.diff_cleanupSemantic(diffs);

    return diffs;
}

export function splitCharacterDiff(diffs) {
    const leftParts = [];
    const rightParts = [];

    for (const [type, text] of diffs) {

        // Unchanged text appears on both sides
        if (type === 0) {

            leftParts.push({
                type: "same",
                text
            });

            rightParts.push({
                type: "same",
                text
            });

        }

        // Removed text only appears on the left
        else if (type === -1) {

            leftParts.push({
                type: "removed",
                text
            });

        }

        // Added text only appears on the right
        else if (type === 1) {

            rightParts.push({
                type: "added",
                text
            });

        }
    }

    return {
        leftParts,
        rightParts
    };
}
/*
 * Main line-level comparison.
 */
export default function compare(leftText, rightText) {

    const leftLines = leftText.split("\n");
    const rightLines = rightText.split("\n");

    const {
        leftChars,
        rightChars,
        charToLine
    } = linesToChars(
        leftLines,
        rightLines
    );

    const diffs = dmp.diff_main(
        leftChars,
        rightChars,
        false
    );

    dmp.diff_cleanupSemantic(diffs);

    return charsToLines(
        diffs,
        charToLine
    );
}