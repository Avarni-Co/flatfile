/**
 * This is a scaffold for defining a Workbook with Sheets and Portals.
 * Test this scaffold using the sample file in examples/sample-uploads/my-sheet-sample.csv.
 *
 * See examples/workbooks/FullExample.ts for a full, working example of a Workbook.
 */
import { Workbook, } from '@flatfile/configure'
import {
    portals,
    sheets
} from './sheets';

export const MyWorkbook = new Workbook( {
    name : 'Entry Workbook',
    namespace : 'entry-workbook',
    portals,
    sheets,
})
