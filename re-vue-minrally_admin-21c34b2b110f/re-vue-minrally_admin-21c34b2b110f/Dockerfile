# build stage
FROM node:16.14.0-alpine
WORKDIR ./app
ENV PATH /app/node_modules/.bin:$PATH
# install app dependencies
COPY . ./
COPY package.json ./
RUN yarn install
EXPOSE 3002
# start app
CMD ["yarn", "start", "PORT=3002"]