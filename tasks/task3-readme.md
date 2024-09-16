# Task 3: Proposals, Concerns and Questions

## Proposals

1. The requests can be directed to a queue (`kafka` or `rabbit`) and then consumed by the `On-Man` application. This allows FIFO and ensures operations are performed in sequence.

2. The data that is frequently queried can be `cached` into a table to allow quick reads. This table can be refreshed frequently and the application can read data without complex joins.

3. `On-Man` can generate a `data-validation-report` that list invalid concepts. Using the sender information, the report can be distributed to interested scientists.

4. Load testing on APIs can be introduced using popular products to ensure the REST apis can handle large number of users.

## Concerns

1. What happens when the data gets corrupts, are there ways to revert operations, or restore to a known time when the data was correct?

## Questions

Career related:

1. As part of the genetics division, does the team get guidance, motivation to learn more about the domain, and does that help shape into a better technical contributor to the world of genetics?

2. How important is the software engineering department to the overall making of a product? As Regeneron is primarily a pharmaceutical, biotechnology company, does the software team take a backseat, or it gets its share of appreciation behind a success story?

3. Where do the engineering teams see themselves evolve to in the next five years? With the advent of foundational models (OpenAI, Llama, etc), do we see a shift in the way software solutions are built? 

4. Is there a centralized common sharing of knowledge culture in Regeneron? There could be solutions already designed by other internal teams that one can re-use. Do we talk to other teams and share our milestones and mistakes?

Technology related:

1. How is the overall SDLC done, do we include unit/integration tests using frameworks like `ava` or `mocha` and include them in the CICD pipeline?

2. How many environments do we have before a version gets deployed to Production?

3. How do we do security patches of packages, is the application automatically scanned?

4. How are metrics handled and communicated to developers (eg: high CPU/Memory usage, database reaching disk threshold, etc)

5. How are users onboarded to the application?
