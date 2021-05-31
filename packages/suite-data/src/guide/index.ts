import { join } from 'path';
import * as fs from 'fs-extra';
import simpleGit from 'simple-git';
import { TMP, GB_SOURCE, GB_REVISION, DESTINATION, ASSETS_DIR } from './constants';
import { parse } from './parser';
import { transform } from './transformer';

// See /docs/misc/guide.md for documentation of this script.

/**
 * Clears the TMP folder and then populates it with content of the
 * GB_SOURCE repository checked out at GB_REVISION commit.
 */
const fetchSource = async () => {
    pruneDirectory(TMP);
    // Run all subsequent git commands in the TMP directory.
    const git = simpleGit({ baseDir: TMP });
    await git.clone(GB_SOURCE, '.');
    await git.checkout(GB_REVISION);
};

/** Ensures the given directory exists and prunes its contents. */
const pruneDirectory = (path: string) => {
    fs.removeSync(path);
    fs.mkdirpSync(path);
}

const main = async () => {
    // Fetch content from GitBook mirror.
    await fetchSource();
    // Parse content tree.
    const index = parse();

    pruneDirectory(DESTINATION);
    // Transform the markdown and copy it to the DESTINATION.
    transform(index);

    fs.writeJSONSync(join(DESTINATION, 'index.json'), index);
    fs.copySync(join(TMP, ASSETS_DIR), join(DESTINATION, ASSETS_DIR));
};

main();
