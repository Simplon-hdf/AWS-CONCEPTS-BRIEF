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

## So to solve this warning, you need just to run: sudo docker run -d --rm -p 80:80 --platform linux/amd64 crawan/aws-concepts-1, and we good to go ⛷️⛷️⛷️
