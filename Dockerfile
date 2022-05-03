FROM node:16-alpine

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

ENV PORT=80
EXPOSE 80

# save boards in "volume"
VOLUME /opt/app/server-data

CMD ["/usr/local/bin/node", "server/server.js"]
