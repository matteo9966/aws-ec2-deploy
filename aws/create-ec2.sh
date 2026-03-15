#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -euo pipefail

dnf update -y

dnf install -y nodejs nginx git

# Verify Node.js installation
node -v > /home/ec2-user/node-version.txt

# Create Nginx configuration for the Node.js app
cat << EOF > /etc/nginx/conf.d/nodeapp.conf
server {
    listen 80;
    server_name _; # This catches all traffic to your IP/domain
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;

        # Helps your Node app see the real user's IP
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
EOF

# Enable and start Nginx
sudo systemctl enable nginx
sudo systemctl start nginx

# Install PM2 globally
sudo npm install -g pm2
pm2 startup

# Output installation details
echo "--------------------------------------"
echo "Installation Complete!"
echo "Node.js version: $(node -v)"
echo "npm version: $(npm -v)"
echo "PM2 version: $(pm2 --version)"
echo "--------------------------------------"