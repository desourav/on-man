# on-man
There are superheroes and then there is `on-man`.

`on-man` is the **Ontology Manager**, an application to manage master data for Ontology

## why run on-man in local

Before getting into the section: [how to run on-man in local](https://github.com/desourav/on-man?tab=readme-ov-file#how-to-run-on-man-in-local), these are the reasons the application was not hosted in AWS EC2:

Pros
- the developers would know how the services interact with each other even before deploying into a managed kubernetes cluster
- this setup uses `Kind` a lightweight kubernetes cluster that can be used in any computer.
- this setup mimics a kubernetes cluster and if the PoC is successful on a demo computer, all one has to do is apply the `kubernetes/*.yaml` file in the managed kubernetes cluster
- it's very quick and easy to check application logs and connect to local `mySQL` database with virtually no lag.

Cons
- Tried the option mentioned in the section how to deploy using lambda function, but the application would fetch `{"message": "Internal server error"}`
- AWS EKS doesn't have a free tier option
- another option is to get AWS EC2 instance - install docker and kubernetes - apply the `kubernetes/*.yaml`. On trying this option most of the time, the free-tier env would freeze or won't respond to simple `kubectl` commands
- although the `security groups` were added to allow `ALL` for `ssh` connection, 4/5 times the `ssh` won't work making debugging impossible.


## how to run on-man in local

Run the following scripts in order mentioned below:

```
# Installs kind using brew and starts a local k8s cluster
scripts/deploy-kind.sh

# Deploys the mySQL database in the cluster and port-forwards it into `localhost:3306`
scripts/deploy-db.sh

# Configures the mySQL database
scripts/configure-db.sh

# Deploys the app and port-forwards it into `localhost:4000`
scripts/deploy-app.sh
```

## how to deploy using lambda function

1.  create a lambda function and upload the nodeJS code as zip
![alt text](image.png)

2. add a trigger to the lambda function
    - create a new apigateway
    - integrate it with the above
    - deploy the same

   ![alt text](image-1.png)

3. ensure the integration is mapped correctly
![alt text](image-2.png)

4. blocker
    - the url generated gives `internal server error`
    - there is no way to integrate the app with a dockerized `mySQL` database. 
    - one option could be to create a mySQL instance - point the private endpoint and credentials to the express app as env variable
    - last but not the least, completing the functional requirement with express + mySQL in the PoC was of utmost importance. If time permits one can explore the AWS offerings and deploy the setup in a managed environment with lesser point of failure.