# Harmandaoğlu A.Ş

Antalya tadilat, anahtar teslim ve villa restorasyonu sitesi. Canlı adres: [harmandaoglu.com.tr](https://harmandaoglu.com.tr)

## Yerel çalışma

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000)

## VPS yayını (Ubuntu + Nginx + Node 20)

1. DNS: `harmandaoglu.com.tr` ve `www` A kaydı VPS IP’sine.
2. Sunucuda:

```bash
sudo bash deploy/setup.sh git@github.com:KULLANICI/harmandaoglu.git
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d harmandaoglu.com.tr -d www.harmandaoglu.com.tr
```

3. Ortam değişkeni `NEXT_PUBLIC_SITE_URL=https://harmandaoglu.com.tr` systemd servisinde tanımlı.

Güncelleme:

```bash
cd /var/www/harmandaoglu
sudo git pull
sudo npm ci
sudo npm run build
sudo systemctl restart harmandaoglu
```
