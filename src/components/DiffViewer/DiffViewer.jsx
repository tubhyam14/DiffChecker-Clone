import "./DiffViewer.css";

import compare, {
    compareCharacters,
    splitCharacterDiff
} from "../../utils/compare";


function createDiffRows(leftText, rightText) {

    const diffs = compare(
        leftText,
        rightText
    );

    const rows = [];

    let leftLineNumber = 1;
    let rightLineNumber = 1;

    for (let i = 0; i < diffs.length; i++) {

        const current = diffs[i];

        if (current.operation === 0) {

            current.lines.forEach((line) => {

                rows.push({
                    type: "unchanged",

                    left: {
                        number: leftLineNumber++,
                        text: line,
                        parts: [
                            [0, line]
                        ]
                    },

                    right: {
                        number: rightLineNumber++,
                        text: line,
                        parts: [
                            [0, line]
                        ]
                    }
                });

            });

            continue;
        }


        if (
            current.operation === -1 &&
            i + 1 < diffs.length &&
            diffs[i + 1].operation === 1
        ) {

            const removedLines = current.lines;
            const addedLines = diffs[i + 1].lines;

            const maxLines = Math.max(
                removedLines.length,
                addedLines.length
            );

            for (let j = 0; j < maxLines; j++) {

                const leftLine = removedLines[j];
                const rightLine = addedLines[j];

                /*
                 * Both sides have a line:
                 * character-level comparison.
                 */
                if (
                    leftLine !== undefined &&
                    rightLine !== undefined
                ) {

const characterDiff =
    compareCharacters(
        leftLine,
        rightLine
    );

const {
    leftParts,
    rightParts
} = splitCharacterDiff(
    characterDiff
);

rows.push({
    type: "modified",

    left: {
        number: leftLineNumber++,
        text: leftLine,
        parts: leftParts
    },

    right: {
        number: rightLineNumber++,
        text: rightLine,
        parts: rightParts
    }
});
                }

                /*
                 * Only left exists.
                 */
                else if (
                    leftLine !== undefined
                ) {

                    rows.push({
                        type: "removed",

                        left: {
                            number: leftLineNumber++,
                            text: leftLine,
                            parts: [
                                [-1, leftLine]
                            ]
                        },

                        right: null
                    });

                }

                /*
                 * Only right exists.
                 */
                else {

                    rows.push({
                        type: "added",

                        left: null,

                        right: {
                            number: rightLineNumber++,
                            text: rightLine,
                            parts: [
                                [1, rightLine]
                            ]
                        }
                    });
                }
            }

            i++;

            continue;
        }


        /*
         * REMOVED
         */
        if (current.operation === -1) {

            current.lines.forEach((line) => {

                rows.push({
                    type: "removed",

                    left: {
                        number: leftLineNumber++,
                        text: line,

                        parts: [
                            [-1, line]
                        ]
                    },

                    right: null
                });

            });

            continue;
        }


        /*
         * ADDED
         */
        if (current.operation === 1) {

            current.lines.forEach((line) => {

                rows.push({
                    type: "added",

                    left: null,

                    right: {
                        number: rightLineNumber++,
                        text: line,

                        parts: [
                            [1, line]
                        ]
                    }
                });

            });
        }
    }

    return rows;
}

/*
 * Render character-level changes.
 */
function renderParts(parts) {

    return parts.map(
        (part, index) => {

            if (part.type === "same") {

                return (
                    <span key={index}>
                        {part.text}
                    </span>
                );

            }

            if (part.type === "removed") {

                return (
                    <span
                        key={index}
                        className="inline-removed"
                    >
                        {part.text}
                    </span>
                );

            }

            if (part.type === "added") {

                return (
                    <span
                        key={index}
                        className="inline-added"
                    >
                        {part.text}
                    </span>
                );

            }

            return null;
        }
    );
}

function DiffCell({
    data,
    side
}) {

    if (!data) {

        return (
            <div className="diff-cell empty">

                <div className="line-number">
                </div>

                <div className="line-text">
                </div>

            </div>
        );

    }

    return (
        <div className="diff-cell">

            <div className="line-number">
                {data.number}
            </div>

            <div className="line-text">

                {renderParts(
                    data.parts
                )}

            </div>

        </div>
    );
}


export default function DiffViewer({
    leftText,
    rightText
}) {

    const rows = createDiffRows(
        leftText,
        rightText
    );

    return (

        <section className="diff-viewer">

            <div className="diff-title">

                <div>

                    <h2>
                        Differences
                    </h2>

                    <p>
                        Side-by-side comparison
                    </p>

                </div>

            </div>


            <div className="diff-table">

                <div className="diff-header">

                    <div>
                        Original
                    </div>

                    <div>
                        Modified
                    </div>

                </div>


                <div className="diff-rows">

                    {rows.map(
                        (row, index) => (

                            <div
                                key={index}
                                className={
                                    `diff-row ${row.type}`
                                }
                            >

                                <DiffCell
                                    data={row.left}
                                    side="left"
                                />

                                <DiffCell
                                    data={row.right}
                                    side="right"
                                />

                            </div>

                        )
                    )}

                </div>

            </div>

        </section>

    );
}