FROM node:18.13 as development

COPY . /jwt-verify-sidecar

WORKDIR /jwt-verify-sidecar

RUN npm install

EXPOSE 4567

CMD ["npm", "run", "dev"]