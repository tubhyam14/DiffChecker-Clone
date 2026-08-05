import "./DiffViewer.css";

import compare from "../../utils/compare";

export default function DiffViewer({

    leftText,
    rightText

}) {

    const diffs = compare(leftText, rightText);

    return (

        <div className="diff-viewer">

            <h2>Differences</h2>

            <div className="diff-output">

                {

                    diffs.map((part, index) => {

                        const [type, text] = part;

                        if (type === 0) {

                            return (
                                <span key={index}>
                                    {text}
                                </span>
                            );

                        }

                        if (type === 1) {

                            return (
                                <span
                                    key={index}
                                    className="added"
                                >
                                    {text}
                                </span>
                            );

                        }

                        return (
                            <span
                                key={index}
                                className="removed"
                            >
                                {text}
                            </span>
                        );

                    })

                }

            </div>

        </div>

    );

}
