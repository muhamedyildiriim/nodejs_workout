/**
 * File: 02-esm/02-import-specific.mjs
 * Topic: ECMAScript Modules → Selective Imports
 * Purpose: Demonstrate importing only specific members from an ESM module with aliasing.
 * Key Points:
 *  - Named imports allow selective import of specific exports.
 *  - Aliasing (`as`) improves clarity and avoids naming conflicts.
 *  - Encourages clean, minimal imports in large modules.
 * Run: node src/02-modules/02-esm/02-import-specific.mjs
 * Expected:
 *  - Prints a red error message using only the imported logError function.
 */

import { logError as esmLogError } from "./06-logger-named.mjs";

esmLogError("some error message printed in red (ESM selective import)");