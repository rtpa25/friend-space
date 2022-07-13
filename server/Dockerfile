FROM node:16

ADD package.json /tmp/package.json

ADD package-lock.json /tmp/package-lock.json

RUN rm -rf dist

RUN cd /tmp && npm install

ADD ./ /src

RUN rm -rf src/node_modules && cp -a /tmp/node_modules /src/

WORKDIR /src

RUN npm run build

CMD [ "node", "dist/src/app.js" ]