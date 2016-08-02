# Validator-SSN
A validator for Finnish Security Number implemented by Node.js and Express.js

How to Install and Test:

1.Clone the code into a folder, e.g. "validator"

2.Install node.js and express.js globally or only to the "validator" folder

Following example in Mac:
brew install nodejs
sudo npm install -g express
sudo npm install -g express-generator (if you'd like to run express from command line)

3. From the "validator" folder, install dependencies by command "npm install"

4. Run "DEBUG=validator:* npm start" from the "validator" folder

5. Open a web browser and type "http://localhost:3000/validateSSN/?ssn=ddmmyy-zzzc"
