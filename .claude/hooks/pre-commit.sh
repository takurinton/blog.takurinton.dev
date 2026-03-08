#!/bin/bash
# Pre-commit hook - runs before git commits
# Ensures code quality checks pass before committing

set -e

echo "Running pre-commit checks..."

# Check if any Rust files are staged
if git diff --cached --name-only | grep -q "\.rs$"; then
    echo "Detected Rust changes, running checks..."

    echo "Running cargo fmt check..."
    cargo fmt --check

    echo "Running cargo check..."
    cargo check

    echo "Running cargo clippy..."
    cargo clippy -- -D warnings
fi

echo "Pre-commit checks passed!"
