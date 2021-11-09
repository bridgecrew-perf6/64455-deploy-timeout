### Check your system (Node >= 14, NPM >= 7, Git > 2.24.2)

git --version

node -v

npm -v

### Update NPM

npm install -g npm

### Setup NPM TOKEN (only needed once)

echo 'export NPM_TOKEN="YOUR_NPM_TOKEN_HERE' >> ~/.zshenv

### Setup App

npm install --legacy-peer-deps

### Start App

npm run dev

### Ignore Build Step in Vercel (for deployment):

bash -c 'if [[$VERCEL_GIT_COMMIT_REF == "deploy"]] || [[$VERCEL_GIT_COMMIT_REF == "preview"]]; then exit 1; fi'
