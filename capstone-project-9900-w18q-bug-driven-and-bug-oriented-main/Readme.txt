# capstone-project-9900-w18q-bug-driven-and-bug-oriented
capstone-project-9900-w18q-bug-driven-and-bug-oriented created by GitHub Classroom

Hi. We are team Bug-driven and Bug-oriented, this is our wait management system project.

We have uploaded our final submission to our team’s GitHub classroom account on time, at 17 November 2022 at 09:00 PM. 
Here is the link: https://github.com/unsw-cse-comp3900-9900-22T3/capstone-project-9900-w18q-bug-driven-and-bug-oriented.git


Please follow the following steps to run our project:

Run on the virtual machine
Download and Initialization
1.Download and install VMWare Workstation Player on your local machine
2.Import Lubuntu virtual machine into VMWare Workstation Player and run the Lubuntu virtual machine
3.Clone the submitted code on your Lubuntu virtual machine
4.Install Python3.8 in your virtual machine  (Notice: Lubuntu virtual machine provided by “COMP9900 Virtual Machine Guides” has pre-installed Python3.8.5, you can type command on terminal: “python3 –version” to get version information of Python)
5.Update apt: sudo apt update  (Notice: this step will ask you to input root password, the password is “lubuntu” according to the “COMP9900 Virtual Machine Environment”)
6.Install pip: sudo apt install python3-pip (Notice: At this step, you will be asked “Do you want to continue ?”, please type “Y”)
7.Install curl: sudo apt install curl (Notice: At this step, you will be asked “Do you want to continue ?”, please type “Y”)
8.Install Node.js: curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
9.Install Node.js: sudo apt-get install -y nodejs

Run frontend website
1.Go to the frontend file dir (Notice: The path shown below is for reference only, please refer to your actual download path)
2.Install the dependencies required by the frontend: npm i (Notice: Sometimes the installation fails due to the network reasons, please try again until all the dependencies are installed successfully)
3.Run the frontend website: npm start
4.Before running the frontend website, you should run the backend server first because the backend server provides the displayed data on the frontend website. (Notice: For better display effect, we recommend you to use Google Chrome as default browser to run the frontend website)

Run backend server
1.Go to the backend file dir (Notice: The path shown below is for reference only, please refer to your actual download path)
2.Install the dependencies required by the backend: pip install -r requirements.txt (Notice: Sometimes the installation fails due to the network reasons, please try again until all the dependencies are installed successfully)
3.Run the backend server: python3 server_app.py
4.After running the backend server successfully, you can run the frontend website
