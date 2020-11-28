FROM node:14-alpine

# setup node
WORKDIR /opt/app
COPY package.json package-lock.json ./
RUN npm ci --production

# copy source
COPY . .

ENV PORT=80
EXPOSE 80

# allow non root user to bind on port 80
# PHP dependencies, create users
RUN apk add --update --no-cache libcap \
    && setcap CAP_NET_BIND_SERVICE=+eip /usr/local/bin/node

# save boards in "volume"
VOLUME /opt/app/server-data

# do not run as root
RUN chown -R node:node /opt/app/
USER node
CMD ["npm", "start"]
