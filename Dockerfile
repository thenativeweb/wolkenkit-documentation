FROM thenativeweb/wolkenkit-box-node:1.1.0
MAINTAINER the native web <hello@thenativeweb.io>

ADD . /documentation/

WORKDIR /documentation

RUN npm install --production --silent && \
    node ./helpers/build.js && \
    rm -rf /tmp/* /root/.npm /root/.node-gyp

CMD [ "dumb-init", "node", "app.js" ]
