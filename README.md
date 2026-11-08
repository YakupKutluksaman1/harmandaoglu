# Harmandaoğlu A.Ş

Antalya tadilat, anahtar teslim ve villa restorasyonu sitesi.

- Asıl adres: [harmandaoglu.com.tr](https://harmandaoglu.com.tr)
- `harmandaoglu.com` ve `www` adresleri kalıcı olarak `.com.tr`’ye yönlenir

## Yerel çalışma

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000)

## VPS yayını (Ubuntu + Nginx + Node 20)

1. DNS: `harmandaoglu.com.tr`, `www.harmandaoglu.com.tr`, `harmandaoglu.com`, `www.harmandaoglu.com` A kaydı aynı VPS IP’sine.
2. Sunucuda:

```bash
sudo bash deploy/setup.sh git@github.com:YakupKutluksaman1/harmandaoglu.git
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx \
  -d harmandaoglu.com.tr -d www.harmandaoglu.com.tr \
  -d harmandaoglu.com -d www.harmandaoglu.com
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
