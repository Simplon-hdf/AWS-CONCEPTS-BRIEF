# AWS-CONCEPTS-BRIEF

## 1) Hosting providers

### There are thousands of Docker-supporting hosting providers. but The three major hosting proiders are AWS(By Amazon web Services), AZURE(By Microsft Azure, Google Cloud), they are clouds services providers which can proivde us with anything that might we want to do in the cloud, web development or web hosting or machine learning and more,

## 2) Deploy to AWS EC2:

### EC2 is a service offerd by AWS, which allow us to setup our own remote hosting machine instance, so we can then connect to this computer then install any software of your choice, to run our docker images for example

## 3) There are three main steps to bring our dockerized application to life on an EC2 instance

### a\ Create and lunch the EC2 instance, Create a VPC(a virtual public cloud), Create a security group, to control who has access to this instance

### b\ Configure security group to expose all required ports to WWW, so rhat we can have incoming trafic to this EC2 instance

### C\Connect to instance (ssh secure shell, a process to connect to this remote machine, which then allows us to run command in this remote computer(EC2 instance)), then install Docker and then pull the image then run the container,

## 4) Build the image : docker build -t aws-concepts .

## 5) Run a container on build image:

### docker run -d -rm --name aws-concept -p 80:80 aws-concepts
