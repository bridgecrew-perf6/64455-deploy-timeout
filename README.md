# next-development

Next Development mono-repo

## Release cycle:

- increment version number in package.json
- npm run version
- rm package-lock.json
- npm i
- npm run release

cd packages/modules;
cd next-auth; npm publish; cd ..;
cd next-base; npm publish; cd ..;
cd next-foundation; npm publish; cd ..;
cd next-sanity; npm publish; cd ..;
cd next-shop; npm publish; cd ..;
