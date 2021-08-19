FROM node:14.16 as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm set loglevel=error && \
    npm set progress=false && \
    npm install && \
    npm install -g @nestjs/cli

COPY . /usr/src/app

RUN npm run test && nest build

FROM node:14.16-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

ENTRYPOINT ["node", "dist/main.js"]