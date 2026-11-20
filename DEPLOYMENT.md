# Deploying SkillRoute

SkillRoute is ONE Node.js app (Express serves the API and the built React site) on a single port.
Accounts, profiles and progress are stored in one file: `db.json`.

## 0. Things you must know before deploying

1. **Persistent storage is mandatory.** Free hosts that wipe the disk on every restart (Render free web service, Vercel, Netlify) will delete all accounts. Use a host with a disk / volume, or a VPS.
2. **Run exactly one instance.** The JSON file database is not meant for several servers at once.
3. **Password-reset e-mails need SMTP.** On your laptop the reset code is printed in the terminal; on a website nobody can see your terminal, so set the `SMTP_*` variables.
4. **Use HTTPS.** Every host below gives it for free. The login cookie is marked `Secure` automatically on HTTPS.
5. Required environment variables in production: `NODE_ENV=production`, `DATA_DIR` (path on the persistent disk) and the `SMTP_*` values. `PORT` is set by most hosts automatically.

Build / start commands used everywhere:

```
npm install
npm run build     # builds the React site into dist/ and the server into dist/server.cjs
npm start         # runs node dist/server.cjs
```

## 1. Put the code on GitHub (needed for Render / Railway)

```
cd SKILLROUTEE
git init
git add .
git commit -m "SkillRoute"
git branch -M main
git remote add origin https://github.com/<your-username>/skillroute.git
git push -u origin main
```
(`.env` and `data/` are already in `.gitignore`, so your secrets and accounts are never uploaded.)

## 2. Option A: Render (easy, needs a paid instance for the disk)

1. Create an account at https://render.com and click **New + > Web Service**, connect your GitHub repo.
2. Settings: Runtime **Node**, Build Command `npm install && npm run build`, Start Command `npm start`.
3. Instance type: **Starter** (a persistent disk is not available on the free type).
4. Open **Disks > Add Disk**: Mount path `/var/data`, size 1 GB.
5. Open **Environment** and add:
   - `NODE_ENV` = `production`
   - `DATA_DIR` = `/var/data`
   - `SMTP_HOST` = `smtp.gmail.com`, `SMTP_PORT` = `587`, `SMTP_USER`, `SMTP_PASS` (Gmail app password), `SMTP_FROM`
6. Click **Create Web Service**. After the build you get `https://<name>.onrender.com`.

## 3. Option B: Railway

1. https://railway.app > **New Project > Deploy from GitHub repo**.
2. In the service, open **Variables** and add the same variables as above (`DATA_DIR` = `/data`).
3. Open **Settings > Volumes** (or right-click the canvas > Volume), create a volume and mount it at `/data`.
4. Set Build Command `npm install && npm run build` and Start Command `npm start`, then **Settings > Networking > Generate Domain**.

## 4. Option C: your own VPS (Ubuntu 22.04/24.04; Oracle Cloud "Always Free", AWS EC2, DigitalOcean, Hostinger...)

This is the cheapest way to get permanent storage.

```
# 1. connect
ssh ubuntu@<server-ip>

# 2. install Node 22, git, nginx, certbot
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs git nginx certbot python3-certbot-nginx

# 3. get the code and build
git clone https://github.com/<your-username>/skillroute.git
cd skillroute
cp .env.example .env && nano .env        # fill SMTP_*; add NODE_ENV=production and DATA_DIR=/var/lib/skillroute
sudo mkdir -p /var/lib/skillroute && sudo chown $USER /var/lib/skillroute
npm install
npm run build

# 4. keep it running with PM2
sudo npm install -g pm2
NODE_ENV=production pm2 start dist/server.cjs --name skillroute
pm2 save && pm2 startup           # run the command it prints

# 5. Nginx reverse proxy
sudo nano /etc/nginx/sites-available/skillroute
```
Paste:
```
server {
  server_name yourdomain.com;
  client_max_body_size 10m;
  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```
```
sudo ln -s /etc/nginx/sites-available/skillroute /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d yourdomain.com      # free HTTPS
```
Point your domain's **A record** to the server IP first. Open ports 80 and 443 in the cloud firewall.

Updating later: `cd skillroute && git pull && npm install && npm run build && pm2 restart skillroute`.

Backup: copy `/var/lib/skillroute/db.json` regularly (`scp` or a cron job).

## 5. Option D: Docker

```
docker build -t skillroute .
docker run -d --name skillroute -p 3000:3000 -v skillroute-data:/data --env-file .env skillroute
```
The volume `skillroute-data` keeps `db.json` safe across restarts. Works on any Docker host (VPS, Fly.io, Azure, AWS).

## 6. After deploying: checklist

1. Open `https://<your-site>/api/health`. It must show `{"status":"ok"...}`.
2. Sign up with a real email, log out, log in again.
3. Click **Forgot password?**, and confirm the 6-digit code arrives by e-mail (if not, re-check the SMTP variables; Gmail needs an App Password, not your normal password).
4. Restart the service and make sure you can still log in (proves the disk is persistent).
