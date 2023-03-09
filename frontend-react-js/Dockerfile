# 1. Development / Install dependencies Stage
FROM node:18-alpine AS development

# set container working directory
WORKDIR /frontend-react-js

# copy only dependency requirements over and installing so rebuild can be faster
COPY package.json ./
COPY package-lock.json ./
RUN npm i

# copy application over
COPY . ./

ENV PORT=3000

EXPOSE ${PORT}

CMD [ "npm", "start"]


# 2. Build stage
FROM development AS build
RUN npm run build

# 2. (optional) used for dev environment beta
# FROM development as dev-envs
# RUN <<EOF
# apt-get update
# apt-get install -y --no-install-recommends git
# EOF

# RUN <<EOF
# useradd -s /bin/bash -m vscode
# groupadd docker
# usermod -aG docker vscode
# EOF

# # install Docker tools (cli, buildx, compose)
# COPY --from=gloursdocker/docker / /
# CMD [ "npm", "start" ]

# 3. Deployment Stage nginx
FROM nginx:1.23.3-alpine

# Copy nginx config
COPY --from=build /frontend-react-js/.nginx/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from build stage
COPY --from=build /frontend-react-js/build .

# Containers run nginx with global directives and daemon off
# https://stackoverflow.com/questions/75636748/why-use-nginx-g-daemonf-off-in-dockerfiles-for-nginx
# run nginx in the foreground so when it stops the container will stop as contianers only runs a single process
ENTRYPOINT ["nginx", "-g", "daemon off;"]