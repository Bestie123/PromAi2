# Context Optimization Rules

## File Size Limits (STRICT)
- Files: ≤500 lines (max 1000)
- Functions: ≤50 lines (max 100)
- Parameters: ≤3 (max 5)

## Context Usage
- Use @file for specific files only
- Avoid @workspace for large projects
- Split large files into modules
- Use fsRead for partial file reading

## Exclude from Context
- Generated files (dist/, build/)
- Large data files (>50KB)
- Binary files
- Temporary files

## Module Structure
```
src/
  core/           # Core modules ≤500 lines each
  ui/             # UI components ≤300 lines each  
  plugins/        # Plugin modules ≤400 lines each
  types/          # Type definitions ≤200 lines each
```