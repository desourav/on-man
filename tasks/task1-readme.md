# Task 1: Execute the business requirement of Ontology Master Data

The business requirement is achieved by implementing:
- NodeJS Express App
- Backend MySQL Database

## kubernetes environment

Once On-Man is deployed using the [steps](https://github.com/desourav/on-man?tab=readme-ov-file#how-to-run-on-man-in-local) mentioned in the README, the nodeJS application and backend mySQL DB should look like:

### Pods

```
kubectl get po -n on-man
NAME                                          READY   STATUS    RESTARTS   AGE
mysql-c987d68d7-p4w4q                         1/1     Running   0          20h
ontology-manager-deployment-56cbf6994-wbfx7   1/1     Running   0          26s
```

### Services

```
kubectl get svc -n on-man
NAME                       TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)          AGE
mysql                      ClusterIP   None           <none>        3306/TCP         20h
ontology-manager-service   NodePort    10.96.185.63   <none>        4000:32109/TCP   30s
```

## api endpoints and actions

Following apiendpoints and actions are supported:
- `GET /concepts`: FETCH ALL CONCEPTS IN THE DATABASE

    ![alt text](../images-png/GET_all.png)


- `GET /concepts/:id`: FETCH A SPECIFIC CONCEPT USING `id`

    ![alt text](../images-png/GET_id.png)

- `POST /concepts`: CREATE A CONCEPT USING JSON PAYLOAD (supports **admin** only)
    
    payload:
    ```
    {
        "id": 1,
        "parent": "",
        "child": "",
        "alternateName": "",
        "displayName": "Diagnosis",
        "description": "Entity domain"
    }
    ```
    header (for `admin`):
    ```
    x-role: admin
    ```

    create a concept with admin (header `x-role: admin`)

    ![alt text](../images-png/POST_admin.png)

    create a concept without admin (header `x-role: admin`) throwing `401 Unauthorized` error

    ![alt text](../images-png/POST_non_admin.png)

- `PUT /concepts`: UPDATE A CONCEPT USING JSON PAYLOAD (supports **admin** only)
    
    payload:
    ```
    {
        "id": 2,
        "parent": "1",
        "child": "",
        "alternateName": "",
        "displayName": "Disease of Nervous System",
        "description": "Diseases targeting the nervous system"
    }
    ```
    header (for `admin`):
    ```
    x-role: admin
    ```

    update a concept with admin (header `x-role: admin`)

    ![alt text](../images-png/PUT_concept.png)

    **NOTE**: updating a concept without admin (header `x-role: admin`) throws `401 Unauthorized` error


- `DELETE /concepts/:id`: DELETE A CONCEPT USING `id` (supports **admin** only)

    header (for `admin`):
    ```
    x-role: admin
    ```

    delete a concept with admin (header `x-role: admin`)

    ![alt text](../images-png/DELETE_id.png)

    **NOTE**: deleting a concept without admin (header `x-role: admin`) throws `401 Unauthorized` error

## authorization implementation 

The api controllers are designed in a way to allow `create`, `update` and `delete` of concepts only when the `header` includes `x-role: admin`.

For admin-scope requests, the application will throw `401 Unauthorized` error if the header doesn't contain required admin role.

## data validation and alignment
### real-time 
These are validations handled by the `on-man` application when a user attempts to write to the database.

1. concept cannot be it's own child
2. concept cannot be it's own parent
3. if parent != '', concept cannot have a non-existing parent
4. if child != '', concept cannot have a non-existing child

For example: the concept_id `5` is trying to refer `8` as child which doesn't exist in the database.
The `PUT` update request is invalidated with `501` error.


![alt text](../images-png/PUT_invalid_payload.png)

### alignment
These are alignment that will be done by the `on-align` application running as `cronJob` once every `n` hours. As these alignments involve querying multiple concepts in a database with petabytes of data, it will require longer time for alignment. As such they are not included in the application `on-man` which focuses on faster reads and writes with immediate responses to the end users.

1. IF A CONCEPT IS CREATED/UPDATED: 

    - update all parents in concept.parent to claim the concept to be their child

    - update all children in concept.child to claim the concept to be their parent

2. IF A CONCEPT IS DELETED:

    - remove it as a child from the list of children in parent concepts

    - remove it as a parent from the list of parents in child concepts


## database view

![alt text](../images-png/database.png)