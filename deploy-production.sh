#!/bin/bash

# Create .env file
mv .env.example .env
gsed -i "s/ENVIRONMENT=\"dev\"/ENVIRONMENT=\"$CRAFT_ENVIRONMENT\"/" .env
gsed -i "s/DB_USER=\"root\"/DB_USER=\"$DB_USER\"/" .env
gsed -i "s/DB_PASSWORD=\"\"/DB_PASSWORD=\"$DB_PASSWORD\"/" .env
gsed -i "s/DB_DATABASE=\"\"/DB_DATABASE=\"$DB_DATABASE\"/" .env
gsed -i "s/DB_PORT=\"\"/DB_PORT=\"$DB_PORT\"/" .env
gsed -i "s/DB_SERVER=\"\"/DB_SERVER=\"$DB_SERVER\"/" .env
gsed -i "s/SECURITY_KEY=\"\"/SECURITY_KEY=\"$SECURITY_KEY\"/" .env
gsed -i "s|DEFAULT_SITE_URL=\"\"|DEFAULT_SITE_URL=\"$SITEURL\"|" .env

# rsync public_html to releases
rsync -azhcvv -e "ssh $SSH_OPTS" --delete --exclude 'sw.js' --exclude 'media' --exclude '.gitkeep' --exclude 'assets/images/' --exclude 'assets/css/' --exclude 'assets/js/' public_html/ $SSH_HOST:./$DEPLOY_DIR/public_html/
rsync -azhcvv -e "ssh $SSH_OPTS" --delete --exclude '.gitkeep' --exclude 'manifests/' --exclude 'fonts/' dist/assets dist/public_html/manifest.json dist/public_html/sw.js  $SSH_HOST:./$DEPLOY_DIR/public_html/
# rsync rest to releases
rsync -azhcvv -e "ssh $SSH_OPTS" --delete vendor config storage translations craft composer.json composer.lock .env modules $SSH_HOST:./$DEPLOY_DIR/
rsync -azhcvv -e "ssh $SSH_OPTS" --delete dist/templates $SSH_HOST:./$DEPLOY_DIR/
# check media
ssh $SSH_OPTS $SSH_HOST "cd $DEPLOY_DIR && mkdir -p media && cd public_html/ && ln -sf ../media/ media"
# Run pending migrations & flush cache
# shellcheck disable=SC2086
ssh $SSH_OPTS $SSH_HOST "cd $DEPLOY_DIR; ./craft backup --zip --overwrite && ./craft migrate/all --interactive 0 && ./craft project-config/apply --interactive 0 && ./craft clear-caches/all && ./craft seomatic/sitemap/generate"
