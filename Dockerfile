FROM node:14-alpine

# setup node
WORKDIR /opt/app
COPY package.json package-lock.json ./
RUN npm ci --production

# allow non root user to bind on port 80
RUN apk add --update --no-cache libcap \
    && setcap CAP_NET_BIND_SERVICE=+eip /usr/local/bin/node \
    && chown -R node:node /opt/app/

# copy source
COPY --chown=node:node . .

ENV PORT=8080
EXPOSE 8080

# save boards in "volume"
VOLUME /opt/app/server-data

# do not run as root
USER node
CMD ["npm", "start"]
