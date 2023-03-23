# AWS-CONCEPTS-BRIEF

## 1) Hosting providers

### There are thousands of Docker-supporting hosting providers. but The three major hosting proiders are AWS(By Amazon web Services), AZURE(By Microsft Azure, Google Cloud), they are clouds services providers which can proivde us with anything that might we want to do in the cloud, web development or web hosting or machine learning and more,

## 2) Deploy to AWS EC2(Virtual Servers in the Cloud):

### EC2 is a service offerd by AWS, which allow us to setup our own remote hosting machine instance, so we can then connect to this computer then install any software of your choice, to run our docker images for example

## 3) There are three main steps to bring our dockerized application to life on an EC2 instance

### a\ Create and lunch the EC2 instance, Create a VPC(a virtual public cloud), Create a security group, to control who has access to this instance

### b\ Configure security group to expose all required ports to WWW, so rhat we can have incoming trafic to this EC2 instance

### C\Connect to instance (ssh secure shell, a network protocol to connect to this remote machine, which then allows us to run command in this remote computer(EC2 instance)), then install Docker and then pull the image then run the container,

## 4) Build the image : docker build -t aws-concepts .

## 5) Run a container on build image:

### docker run -d -rm --name aws-concept -p 80:80 aws-concepts

## Bind Mounts concepts: is to provide our local host project files to the running container, and we can change the codes in project files and see the change instantly without restarting the container(on dev mode onley and not in prod)

## Itroduction to AWS & EC2

### \*\ Create an acount on AWS web

### \*\ Sign in

### \*\ Have credit card even if we use free tier option

### \*\ Login to AWS management console, then search for a service in our case we search for EC2 serivce

### \*\ Then we click on lunch instance to start the steps to create a new instance

#### 1\ We choose an operating system (Then choose if we want free or not t2.mico1 is free)

#### 2\ Create pair Key, Key pair (login) Info You can use a key pair to securely connect to your instance, and download it 💥 and not to share.

#### 3\ Configure VPC details (be sure that VPC default is preselected) otherwise click create new VPC, and we let all the others details as they are unless we know what we are doing .

#### 4\click review and lunch

---

# Connect via an SSH client.

## Locate your private key file. The key used to launch this instance is aws-concepts.pem

### Run this command, if necessary, to ensure your key is not publicly viewable.

#### chmod 400 your-key

### Connect to your instance using its Public DNS:

#### ec2-100-25-48-55.compute-1.amazonaws.com

### Example:

#### ssh -i your-key ec2-user@ec2-100-25-48-55.compute-1.amazonaws.com

---

# Installing Docker in running instance(remote machine)

## 1\ To ensure that all essential packages are on this remote machine are updated and are using there latest version by running: $ sudo yum update -y

## 2\ To install docker in our remote machine we run (command amazon-linux-extras, to make the installation essy): sudo yum install docker

## 3\ Start docker service on the remote machine by running: sudo service docker start

# Of course you might not always want to install it on a AWS EC2 instance though - maybe you are using a different provider.

## In that case, you can always follow the Linux setup instructions you find on the official Docker page: https://docs.docker.com/engine/install/ (under "Server").

---

# Now we need to bring our local docker-image into the remote machine, and for this we have two main approches

## 1\ Deploy our source code, finding away of copping our source code(everything in project folder in local machine including dockerfile) into the remote machine, then we build the image in the remote machine

## 2\ Deploy Built Image, build image localy, then just run docker run in remote mache after bring in the built image inside the remote machine

# So it's convenient to take the option 2, to build the the image localy then push to the docker hub , then bring the built image from dockerhub to our remote machine.

## 1\ Coonect to the docker hub then create a new repository on it

## 2\ Create an image locally having the repository name create on dockerhub(step 1) as a name

### a\ Build the locally image run: docker build -t aws-concepts .

### b\ Now rename the built image (aws-concepts ) by repository name create in step 1(crawan/aws-concepts-1) run: docker tag aws-concepts crawan/aws-concepts-1

### c\ Finally we push the image to docker hub with the name on step b, by run: docker push crawan/aws-concepts-1 (we must be connected to our dockerhub, else we run : docker login , then we provide the username and the password of our dockerhub account)

## 3\ Download the image from docker hub into our remot machine by run: sudo docker run -d --rm -p 80:80 crawan/aws-concepts-1

# 💥💥 Troubleshooting, if you use mac M1 as a local machine to build your image, after run: sudo docker run -d --rm -p 80:80 crawan/aws-concepts-1, you may face this warning: 🔥WARNING: The requested image's platform (linux/arm64/v8) does not match the detected host platform (linux/amd64) and no specific platform was requested🔥,

## So to solve this warning, you need just to run: sudo docker run -d --rm -p 80:80 --platform linux/amd64 crawan/aws-concepts-1, or docker buildx build --platform=linux/amd64 -t psql-compose .,(the las one is the best solution) and we good to go ⛷️⛷️⛷️

# Run the built image in the browser :

## To access the application from the browser w'll use the Public IPv4 address that exist in the details of our istance in aws account, but by default onley connection allowed is typ SSH connection, so we need to allow http trafic in order to rich to the application from browser, so we need to edit th inbound rules in order to allow http trafic fom everywhere

### 1\ Click the instance that we want change it's the securty group

### 2\ On the details, click on the security group name, to take as to the page of that security group

### 3\ Then we click on inbound rules

### 4\ Then click Edit inbound rules

### 5\ Then click Add rule

### 6\ From type we chose HTTP

### 7\ From Source , we choose anywhere-IP4

### 8\ Click save

### 9\ Now you can access the application from the browser by running the Public IP address of your instance

# Last thing, build the docker comose file inside the remote machine:

## 1) Install the docker-compose

### sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose; sudo chmod +x /usr/local/bin/docker-compose ;docker-compose version

## 2) Build the docker-compoe.yml file using vim editor having the built image and DB image image

## 2) Run docker-compose up

# 🪂\_**\_ The end of Elastic computing cloud (EC2) tutorial \_\_** 🪂

# 📕Start of Elastic Container service (ECS):

## Unlike EC2, it's NOT covered by the AWS free tier - you can check the "Free Tier" page to see what's included: https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc

## If you are okay with incurring some costs. You'll only be charged a few dollars if you follow along as shown (and you then remove all resources thereafter) - to learn more about the AWS pricing, please visit their pricing page: https://aws.amazon.com/pricing/

## Important: You really should double-check to remove ALL created resources (e.g. load balancers, NAT gateways etc.) once you're done - otherwise, monthly costs can be much higher!

## ECS need to be setup in four steps, Container definition, Task definition, Service, Cluster,

### 1\Container definition: click on custom, then configure

#### a\ Container name, aws-concepts in my case

#### b\ Define the image in which this container should be build, we take the built image psql-compose form my docker hub; crawan/psql-compose

#### c\ Map a port, should the same port as we defined in app.js port, in my case is port 80

#### d\ Advanced container configuration

##### 1\ Healthcheck,to check if the container is running successfully, but we dont need to configure this at the begginig

##### 2\ Environment: we can overwrite the docker commands and also the working directory

##### 3\ Container Timeouts, to tell aws when it should stop lunch this container

##### 4\ Set up Networks setting, by default our container will be reachable from the net, unless we disable the network

##### 5\ Storage and logging

##### 6\ log confifguration to manage and store the logs generated by the container

#### E\ Task definition: is a blueprint for our application, herer we tell the application how it could launch our container, a task is just like one remote server that can run one or multipule containers, it's a bit like the EC2 instance that we managing ourself, but ECS we dont managing it ourself , but we still tell aws which environment it should setup for them.

##### 💥Fargate, is a way of launching a container in serverless mode, the is to start the container whenever there are a request to the container then stop the container once the job is done, then wait for the next request ..., and you onley pay while the container is running and not when the container is i rest

#### F\ Service, the service controls,how these tasks should be executed, and every task excuted by a service, we have one service y a task

##### a\ We can set a load Balancer in this step

#### J\ Cluster, where we can groupe containers in one cluster, so are all belong together logically and then they all can talk to each other

##### And here we have network(VPC) that automatically create for us, so onley thing we can is to click next
