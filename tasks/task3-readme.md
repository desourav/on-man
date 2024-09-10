# Task 3: Proposals, Concerns and Questions

## Proposals

1. The requests can be directed to a queue (`kafka` or `rabbit`) and then consumed by the `On-Man` application. This allows FIFO and ensures operations are performed in sequence.

2. The data that is frequently queried can be `cached` into a table to allow quick reads. This table can be refreshed frequently and the application can read data without complex joins.

3. `On-Man` can generate a `data-validation-report` that list invalid concepts. Using the sender information, the report can be distributed to interested scientists.

4. Load testing on APIs can be introduced using popular products to ensure the REST apis can handle large number of users.

## Concerns

1. What happens when the data gets corrupts, are there ways to revert operations, or restore to a known time when the data was correct?

## Questions

1. How is the overall SDLC done, do we include unit/integration tests using frameworks like `ava` or `mocha` and include them in the CICD pipeline?

2. How many environments do we have before a version gets deployed to Production?

3. How do we do security patches of packages, is the application automatically scanned?

4. How are users onboarded to the application?
