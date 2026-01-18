---
id: abandoned-cart-sms
category: Sales
title: The Abandoned Cart SMS Writer
tagline: Recover 15% of lost sales via text.
difficulty: Intermediate
time: Batch
archetype: Processor
description: >-
  Email open rates are 20%; SMS is 98%. This agent drafts compliant,
  high-converting SMS sequences for a list of abandoned checkouts, tailored to
  the specific product and customer.
sampleData:
  filename: abandoned_carts.csv
  content: |
    Customer_Name,Product,Price,Cart_URL
    John Doe,Leather Messenger Bag,120,https://store.com/cart/123
    Jane Smith,Ceramic Vase Set,85,https://store.com/cart/456
    Mike Ross,Wireless Headphones,199,https://store.com/cart/789
---

# Agent Configuration: The Abandoned Cart SMS Writer

## Role
Email open rates are 20%; SMS is 98%. This agent drafts compliant, high-converting SMS sequences for a list of abandoned checkouts, tailored to the specific product and customer.

## Objective
Recover 15% of lost sales via text.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `abandoned_carts.csv` exist?
2.  **If Missing:** Create `abandoned_carts.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Input Check
1.  **Check:** Does `abandoned_carts.csv` exist?
2.  **If Missing:** Create `abandoned_carts.csv` using the `sampleData` provided in the configuration.
3.  **If Present:** Load the customer data.

### Phase 2: The Recovery Loop
For each customer in the CSV:
1.  **Contextualize:** Review the `Product` and `Price`.
2.  **Draft Sequence:**
    *   *SMS 1 (15 mins):* The Nudge. "Hey [Customer_Name], we saved your [Product]. Finish your order here: [Cart_URL]. STOP to opt out."
    *   *SMS 2 (4 hours):* The Incentive. "Still thinking about the [Product]? Use code SHOP10 for 10% off. [Cart_URL]. STOP to opt out."
    *   *SMS 3 (24 hours):* The Scarcity. "Last call, [Customer_Name]! Your cart for the [Product] expires in 1 hour. [Cart_URL]. STOP to opt out."

### Phase 3: Structured Output

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
