from node:12-alpine
WORKDIR /array-node-app

run npm install pm2 -g
run pm2 list

copy package.json package-lock.json ./

run rm -rf node_modules && npm install --frozen-lockfile && npm cache clean --force
copy . ./

EXPOSE 3001
CMD ["sh", "-c", "pm2-runtime start ./config/ecosystem.config.js"]