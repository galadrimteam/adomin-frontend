# Adomin frontend

This is the frontend for the Adomin backoffice.

:bulb: quick reminder: this is now **your code**

## Configuration

The only configuration you need on the frontend is changing VITE_API_URL and set it to your backend URL

The real configurations are on the backend side (to set which tables to show, permissions, etc, etc), for more infos [check this](https://github.com/galadrimteam/adomin?tab=readme-ov-file#adomin)

If some features that you would like to have in your backoffice are not implemented, fear not, you can just edit the code, it's yours 🤭

## How does it work, where do I edit things

Good question! Here is some reading for you :nerd_face:

- [routing](./docs/routing.md)

## Deployment

If you are using github actions and s3/cloudfront, you can check [staging.yml](.github/workflows/staging.yml)

Anyway, you can look at it for inspiration, but in theory all you have to do is :

- `yarn build` with correct VITE_API_URL env variable set
- copy dist folder to your static files service
- serve those files with a rule for SPAs (e.g. serving the index.html on 404)
  for this last bullet point, you can find inspiration for [nginx](https://sdickinson.com/nginx-config-for-single-page-applications/) and for [caddy](./docs/caddy-example.md)
