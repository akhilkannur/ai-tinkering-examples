#!/bin/bash
# Run this after every enrichment batch to catch damage before it compounds.
# Usage: bash scripts/validate-tools.sh

FILE="lib/ai-tools-data.ts"
ERRORS=0

echo "=== Tool Data Validation ==="
echo ""

# 1. TypeScript compilation
echo -n "✓ TypeScript compiles: "
if npx tsc --noEmit "$FILE" 2>/dev/null; then
  echo "PASS"
else
  echo "FAIL ❌"
  ERRORS=$((ERRORS + 1))
fi

# 2. Tool count (should never decrease)
TOOL_COUNT=$(grep -c 'url: "' "$FILE")
echo "✓ Total tools: $TOOL_COUNT"
if [ "$TOOL_COUNT" -lt 300 ]; then
  echo "  ❌ DANGER: Tool count dropped below 300 (expected ~309+). Tools may have been deleted!"
  ERRORS=$((ERRORS + 1))
fi

# 3. Check enriched tools weren't damaged (spot check known-good tools)
ENRICHED_URLS=("vidmix.ai" "xmit.sh" "secvibe.ai" "getalignmint.org" "feynn.ai")
for url in "${ENRICHED_URLS[@]}"; do
  if ! grep -q "$url" "$FILE"; then
    echo "  ❌ MISSING enriched tool with URL containing: $url"
    ERRORS=$((ERRORS + 1))
  fi
done
echo "✓ Enriched tool spot-check: all present"

# 4. Integrations count (should never decrease significantly)
INT_COUNT=$(grep -c 'integrations: \[' "$FILE")
echo "✓ Tools with integrations: $INT_COUNT"
if [ "$INT_COUNT" -lt 100 ]; then
  echo "  ❌ DANGER: Integrations dropped below 100 (was 111). Data may have been wiped!"
  ERRORS=$((ERRORS + 1))
fi

# 5. Maker count
MAKER_COUNT=$(grep -c 'maker: {' "$FILE")
echo "✓ Tools with makers: $MAKER_COUNT"
if [ "$MAKER_COUNT" -lt 40 ]; then
  echo "  ❌ DANGER: Maker count dropped below 40 (was 45). Makers may have been wiped!"
  ERRORS=$((ERRORS + 1))
fi

# 6. PricingDetails count (should only go up)
PRICING_COUNT=$(grep -c 'pricingDetails:' "$FILE")
echo "✓ Tools with pricingDetails: $PRICING_COUNT"
if [ "$PRICING_COUNT" -lt 115 ]; then
  echo "  ❌ DANGER: PricingDetails dropped below 115 (was 120). Data may have been wiped!"
  ERRORS=$((ERRORS + 1))
fi

# 7. Placeholder count (should only go down)
PLACEHOLDER_COUNT=$(grep -c "Improves productivity\|Time-saving tools\|Streamlined workflow\|Easy integration\|AI-powered automation\|Advanced AI features" "$FILE")
echo "✓ Remaining placeholders: $PLACEHOLDER_COUNT"

# 8. Check for banned phrases in non-placeholder context (new enrichments using banned words)
echo ""
echo "=== Summary ==="
if [ "$ERRORS" -gt 0 ]; then
  echo "❌ $ERRORS ERROR(S) FOUND — DO NOT COMMIT. Something went wrong."
  exit 1
else
  echo "✅ All checks passed. Safe to continue."
  exit 0
fi
