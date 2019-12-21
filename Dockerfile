 FROM node:latest  
   
 RUN mkdir -p /usr/src/api  
 RUN npm install nodemon -g  
   
 WORKDIR /usr/src/api  
 COPY api/package.json /usr/src/api/package.json  
 RUN yarn install 
   
 EXPOSE 3000
   
 CMD ["yarn", "start"]  