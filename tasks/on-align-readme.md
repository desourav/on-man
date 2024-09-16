# on-align

## use case

### Scenario

#### Imagine the data in Ontology DB as below. This is a perfectly valid data.

| id | displayName               | description                  | parent | child | alternateName |
|----|---------------------------|------------------------------|--------|-------|---------------|
| 1  | Diagnosis                 | Entity Domain                |        |       |               |
| 2  | Disease of Nervous System | Diseses targeting the nerves | 1      | 5     |               |
| 3  | Disease of Eye            | Diseases targeting the eyes  | 1      |       |               |
| 4  | Physical Disorders        | Physical Disorders           | 1      | 5     |               |
| 5  | Multiple Sclerosis        | Multiple Sclerosis           | 2,4    |       | MS            |


#### Now we try to `add` a new concept

| id | displayName               | description                  | parent | child | alternateName |
|----|---------------------------|------------------------------|--------|-------|---------------|
| 6  | Dry Eye                   | Dryness in the eye           | 3,4    |       |               |




#### The resulting data in the database is:

| id | displayName               | description                  | parent | child | alternateName |
|----|---------------------------|------------------------------|--------|-------|---------------|
| 1  | Diagnosis                 | Entity Domain                |        |       |               |
| 2  | Disease of Nervous System | Diseses targeting the nerves | 1      | 5     |               |
| 3  | Disease of Eye            | Diseases targeting the eyes  | 1      |       |               |
| 4  | Physical Disorders        | Physical Disorders           | 1      | 5     |               |
| 5  | Multiple Sclerosis        | Multiple Sclerosis           | 2,4    |       | MS            |
| 6  | Dry Eye                   | Dryness in the eye           | 3,4    |       |               |

#### The problems with this data is:
1. concept #3 should be updated with child as #6
2. concept #4 should be updated with child as #6
3. there has been no validation done if concept #6 claims invalid parents (eg: concept #5)

### Who should perform these updates and validations?

At first glance it becomes obvious for `on-man` to do these validations. But imagine there are millions of records to parse and these heavy queries have to be done before sending a response to the user.

In order to keep api calls lightweight and high performance, these updates and validations are handed over to another application, `on-align`.

`on-align` runs as a backend cronJob (once a day or week depending on the requirement) and 
- updates the database with correct parent and child for concepts
- validates based on rules set by Ontology team
- reports invalid data back to interested parties
- creates a materialized view or a snapshot for quick querying of data

Hence the eventually aligned data will look like:

| id | displayName               | description                  | parent | child | alternateName |
|----|---------------------------|------------------------------|--------|-------|---------------|
| 1  | Diagnosis                 | Entity Domain                |        |       |               |
| 2  | Disease of Nervous System | Diseses targeting the nerves | 1      | 5     |               |
| 3  | Disease of Eye            | Diseases targeting the eyes  | 1      | 6     |               |
| 4  | Physical Disorders        | Physical Disorders           | 1      | 5,6   |               |
| 5  | Multiple Sclerosis        | Multiple Sclerosis           | 2,4    |       | MS            |
| 6  | Dry Eye                   | Dryness in the eye           | 3,4    |       |               |