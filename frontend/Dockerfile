FROM node

WORKDIR /app/frontend
COPY package.json /app/frontend

RUN npm install
RUN chown -R node.node ./node_modules
EXPOSE 3000
CMD ["npm", "start"]