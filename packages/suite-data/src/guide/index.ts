import * as fs from 'fs-extra';
import simpleGit from 'simple-git';
import { TMP, GB_SOURCE, GB_REVISION } from './constants';

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

fetchSource();
