#!/bin/bash
mkdir /home/coder/project/node
LOG_FILE=/home/coder/project/node/log.txt 
terraform -chdir=/home/coder/project/workspace/terraform init >> "$LOG_FILE" 2>&1
terraform -chdir=/home/coder/project/workspace/terraform plan -out=tfplan.binary >> "$LOG_FILE" 2>&1
terraform -chdir=/home/coder/project/workspace/terraform show -json tfplan.binary > /home/coder/project/workspace/terraform/tfplan.json
cp -r /home/coder/project/workspace/nodejest/* /home/coder/project/node
cd /home/coder/project/node
npm i
npm install jest >> "$LOG_FILE" 2>&1
npm test >> "$LOG_FILE" 2>&1
cat /home/coder/project/node/log.txt
rm -rf /home/coder/project/node
