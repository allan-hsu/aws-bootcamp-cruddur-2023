# 1. Development Stage
FROM python:3.10-slim-buster AS development

WORKDIR /backend-flask

COPY requirements.txt ./
RUN pip3 install -r requirements.txt

COPY . ./

ENV FLASK_DEBUG=True

EXPOSE 4567
CMD [ "flask", "run"]

# 2. Docker dev env Stage
FROM development AS dev-envs

RUN <<EOF
apk update
apk add git
EOF

RUN <<EOF
addgroup -S docker
adduser -S --shell /bin/bash --ingroup docker vscode
EOF

# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /

CMD ["flask", "run"]

# nginx for production server ?
# FROM nginx:1.23.3-alpine

# COPY --from=development /backend-flask/.nginx/nginx.conf /etc/nginx/conf.d/default.conf