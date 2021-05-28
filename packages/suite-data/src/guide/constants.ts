import { resolve, join } from 'path';

export const GB_SOURCE = 'git@github.com:trezor/trezor-suite-guide.git';
export const GB_REVISION = '867eda00926bc065c3ec7eaee26832d08549ecfe';
export const TMP = join(resolve(__dirname, '../..'), 'tmp', 'guide');
// Path to the GitBook assets. Relative to TMP.
export const ASSETS_DIR = join('.gitbook', 'assets');
export const DESTINATION = join(resolve(__dirname, '../..'), 'files', 'guide');
