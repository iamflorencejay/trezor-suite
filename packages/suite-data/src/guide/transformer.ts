import { join } from 'path';
import * as fs from 'fs-extra';
import { TMP, DESTINATION } from './constants';
import { Node } from './parser';

/** Removes the front-matter from beginning of a string. */
const clean = (md: string): string => {
    return md.replace(/^---\n.*?\n---\n/s, '');
};

/**
 * Given index of GitBook content transforms the content
 * and dumps it into the DESTINATION directory.
 *
 * Removes GitBook front-matter from MD files if present.
 * @param node
 */
export const transform = (node: Node) => {
    if (node.type === 'category') {
        node.locales.forEach(locale => {
            fs.mkdirpSync(join(DESTINATION, locale, node.id));
        });
        node.children.forEach(transform);
    } else {
        node.locales.forEach(locale => {
            const markdown = clean(fs.readFileSync(join(TMP, locale, node.id)).toString());
            fs.writeFileSync(join(DESTINATION, locale, node.id), markdown);
        });
    }
};
