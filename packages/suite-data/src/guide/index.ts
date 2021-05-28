import * as fs from 'fs-extra';
import simpleGit from 'simple-git';
import { TMP, GB_SOURCE, GB_REVISION } from './constants';
import { parse } from './parser';

/**
 * Clears the TMP folder and then populates it with content of the
 * GB_SOURCE repository checked out at GB_REVISION commit.
 */
const fetchSource = async () => {
    fs.removeSync(TMP);
    fs.mkdirpSync(TMP);
    // Run all subsequent git commands in the TMP directory.
    const git = simpleGit({ baseDir: TMP });
    await git.clone(GB_SOURCE, '.');
    await git.checkout(GB_REVISION);
};

const main = async () => {
    // Fetch content from GitBook mirror.
    await fetchSource();
    // Parse content tree.
    const index = parse();

    console.log(JSON.stringify(index, undefined, 2));
};

main();
