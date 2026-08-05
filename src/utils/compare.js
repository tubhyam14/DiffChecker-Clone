import { diff_match_patch } from "diff-match-patch";

const dmp = new diff_match_patch();

export default function compare(left, right) {

    const diff = dmp.diff_main(left, right);

    dmp.diff_cleanupSemantic(diff);

    return diff;

}
