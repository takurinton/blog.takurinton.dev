#!/bin/bash
# Post-edit hook - runs after file edits
# Auto-formats code and runs quick checks

FILE_PATH="$1"

# Rust files - auto format
if [[ "$FILE_PATH" =~ \.rs$ ]]; then
    echo "Auto-formatting Rust file: $FILE_PATH"
    cargo fmt --quiet 2>/dev/null || true
fi

# JavaScript/CSS files - no formatter configured, just notify
if [[ "$FILE_PATH" =~ \.(js|css)$ ]]; then
    echo "Edited: $FILE_PATH"
fi
