#!/usr/bin/env bash
set -euo pipefail

APP_DIR=/var/www/harmandaoglu
REPO_URL="${1:-}"

if [ -z "$REPO_URL" ]; then
  echo "Kullanım: sudo bash deploy/setup.sh git@github.com:KULLANICI/harmandaoglu.git"
  exit 1
fi

apt-get update
apt-get install -y nginx git curl

if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi

id -u harmandaoglu >/dev/null 2>&1 || useradd --system --home "$APP_DIR" --shell /usr/sbin/nologin harmandaoglu

mkdir -p "$APP_DIR"
if [ ! -d "$APP_DIR/.git" ]; then
  git clone "$REPO_URL" "$APP_DIR"
else
  git -C "$APP_DIR" pull --ff-only
fi

cd "$APP_DIR"
npm ci
npm run build
chown -R harmandaoglu:harmandaoglu "$APP_DIR"

install -m 644 deploy/harmandaoglu.service /etc/systemd/system/harmandaoglu.service
install -m 644 deploy/nginx.conf /etc/nginx/sites-available/harmandaoglu
ln -sfn /etc/nginx/sites-available/harmandaoglu /etc/nginx/sites-enabled/harmandaoglu
rm -f /etc/nginx/sites-enabled/default

nginx -t
systemctl daemon-reload
systemctl enable --now harmandaoglu
systemctl reload nginx

echo "HTTP yayını hazır. SSL için:"
echo "apt-get install -y certbot python3-certbot-nginx"
echo "certbot --nginx -d harmandaoglu.com.tr -d www.harmandaoglu.com.tr"
