# https://mherman.org/blog/dockerizing-a-react-app/

# pull official base image
FROM node:14-alpine3.10

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . ./

# start app
CMD ["npm", "start"]


# FROM node:14-alpine3.10
# WORKDIR /usr/src/website
# COPY package.json package-lock.json ./
# RUN npm i
# COPY . ./
# # RUN npm build
# EXPOSE 3000
# CMD npm start

# FROM nginx:1-alpine
# COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
# EXPOSE 3000
# CMD ["nginx", "-g", "daemon off;"]
