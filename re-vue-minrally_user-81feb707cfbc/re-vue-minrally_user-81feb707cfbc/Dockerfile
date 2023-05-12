# pull official base image
FROM node:16.14.0
# set working directory
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package*.json ./
RUN npm install -g npm@8.5.1
RUN yarn install --silent
# RUN rm -rf node_modules package-lock.json && npm install

# add app
COPY . ./

EXPOSE 3001
# start app
CMD ["yarn", "dev", "-p", "3001"]