#!/bin/bash

# Real AI Examples - Master Skills Installer
# This script downloads and installs all 5 Master Skills

set -e

echo "🚀 Real AI Examples - Master Skills Installer"
echo "=============================================="
echo ""

# Detect the skills folder
if [ -d "$HOME/.claude/skills" ]; then
    SKILLS_DIR="$HOME/.claude/skills"
    echo "✓ Found Claude Code skills folder: $SKILLS_DIR"
elif [ -d "$HOME/.agents/skills" ]; then
    SKILLS_DIR="$HOME/.agents/skills"
    echo "✓ Found agents skills folder: $SKILLS_DIR"
else
    # Default to Claude Code
    SKILLS_DIR="$HOME/.claude/skills"
    echo "ℹ Creating skills folder: $SKILLS_DIR"
    mkdir -p "$SKILLS_DIR"
fi

echo ""

# Check if we're in the extracted ZIP folder
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Look for the skill files
if [ -f "$SCRIPT_DIR/sales-ops.md" ]; then
    echo "📦 Installing Master Skills from local files..."
    echo ""
    
    # Copy all .md files
    for file in "$SCRIPT_DIR"/*.md; do
        if [ -f "$file" ]; then
            filename=$(basename "$file")
            # Skip README
            if [ "$filename" != "README.md" ] && [ "$filename" != "README-private.md" ]; then
                cp "$file" "$SKILLS_DIR/"
                echo "✓ Installed: $filename"
            fi
        fi
    done
    
    echo ""
    echo "=============================================="
    echo "✅ Installation Complete!"
    echo ""
    echo "All 5 Master Skills have been copied to:"
    echo "  $SKILLS_DIR"
    echo ""
    echo "Usage examples:"
    echo '  "From a sales-ops standpoint, review my pipeline"'
    echo '  "Using the marketing-ops framework, audit this campaign"'
    echo '  "From a seo-content perspective, analyze this page"'
    echo ""
    echo "=============================================="
    
else
    echo "❌ Error: Skill files not found in this directory"
    echo ""
    echo "Make sure you:"
    echo "1. Extracted the ZIP file completely"
    echo "2. Are running this script from the extracted folder"
    echo ""
    echo "If you downloaded the ZIP, extract it first:"
    echo "  unzip real-ai-examples-master-skills.zip"
    echo "  cd real-ai-examples-master-skills"
    echo "  ./install.sh"
    exit 1
fi
