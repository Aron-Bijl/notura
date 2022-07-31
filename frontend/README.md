Followed this tutorial to deploy React App to a VPS (virtual private server): 

https://www.youtube.com/watch?v=w3RFk35synM
Learn How To Deploy a React App To a VPS | Ubuntu 20.04 Server With NGINX

and this one:
https://www.youtube.com/watch?v=Nxw2j1-srVc
Deploy Node.js and React Apps | Full Deployment /w Nginx VPS, SSL

NGINX server configuration, see bellow. Before configuration, run - npm install - in the frontend folder, then copy this to /var/www/ to a file that you create there (here it is notura). The single page App will be served from here.  Make sure you connect the App to your database via a link in the .env file. To do so, create an .env file in the backend folder with MONGODB_URI=this-will-be-your-database-link

server {
  listen 80;

  index index.html index.htm;
  server_name example.com www.example.com;

  location / {
        root /var/www/notura;
        try_files $uri /index.html;
  }

 location ~^/api(.*) {
        proxy_pass http://localhost:5500; #whatever port your app runs on
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Forwarded-Host $server_name;
        proxy_redirect off;
  }

  location /images/thumbnail/ {
        proxy_pass http://localhost:5500/images/thumbnail/;  #whatever port your app runs on
  }

 location /images/covers/ {
        proxy_pass http://localhost:5500/images/covers/;  #whatever port your app runs on
 }

 location /images/avatars/ {
        proxy_pass http://localhost:5500/images/avatars/;  #whatever port your app runs on
 }

 location /backups/ {
        proxy_pass http://localhost:5500/backups/;  #whatever port your app runs on
 }

}
