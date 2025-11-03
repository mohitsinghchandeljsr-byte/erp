# 🚀 Deployment Guide

Complete guide for deploying the Gaya College ERP System to production.

## 📋 Pre-Deployment Checklist

### Security
- [ ] Change SESSION_SECRET to a strong random value
- [ ] Update default login credentials
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Review and set production environment variables
- [ ] Enable database backups
- [ ] Set up error monitoring (optional)

### Database
- [ ] Database created and accessible
- [ ] DATABASE_URL configured correctly
- [ ] Schema pushed to production database
- [ ] Seed data loaded (if needed)
- [ ] Database backups configured

### Application
- [ ] All environment variables set
- [ ] Build succeeds without errors
- [ ] Type checking passes (`npm run check`)
- [ ] Dependencies installed and up to date

## 🌐 Web Deployment Options

### Option 1: Replit Deployment (Recommended)

1. **Click the "Deploy" button** in Replit interface
2. **Configure deployment settings**:
   - Select "Web Application"
   - Set build command: `npm run build`
   - Set start command: `npm start`
3. **Set environment variables** in Replit deployment settings
4. **Deploy** and get your public URL

### Option 2: VPS/Cloud Server (DigitalOcean, AWS, etc.)

1. **Set up server** (Ubuntu 22.04 LTS recommended)
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js 18+
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   
   # Install PostgreSQL
   sudo apt install -y postgresql postgresql-contrib
   ```

2. **Clone repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/gaya-college-erp.git
   cd gaya-college-erp
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   nano .env  # Edit with your production values
   ```

4. **Set up database**
   ```bash
   # Create database
   sudo -u postgres createdb gaya_erp
   
   # Push schema
   npm run db:push
   ```

5. **Build application**
   ```bash
   npm run build
   ```

6. **Set up PM2 (Process Manager)**
   ```bash
   sudo npm install -g pm2
   pm2 start npm --name "gaya-erp" -- start
   pm2 save
   pm2 startup
   ```

7. **Configure Nginx (Reverse Proxy)**
   ```bash
   sudo apt install -y nginx
   sudo nano /etc/nginx/sites-available/gaya-erp
   ```

   Add configuration:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   Enable site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/gaya-erp /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

8. **Set up SSL with Let's Encrypt**
   ```bash
   sudo apt install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

### Option 3: Docker Deployment

1. **Create Dockerfile** (already included in project)
2. **Build image**
   ```bash
   docker build -t gaya-erp .
   ```

3. **Run container**
   ```bash
   docker run -d \
     -p 5000:5000 \
     -e DATABASE_URL="your-database-url" \
     -e SESSION_SECRET="your-secret" \
     --name gaya-erp \
     gaya-erp
   ```

## 💻 Native Desktop Application Deployment

### Windows 11 Distribution

1. **Build the installers** (on Windows or using CI/CD):
   ```bash
   npm run build
   ./scripts/electron-build-win.sh
   ```

2. **Generated files**:
   - `GayaCollegeERP-Setup-1.0.0.exe` - Full installer (~150MB)
   - `GayaCollegeERP-Portable-1.0.0.exe` - Portable version

3. **Distribution options**:
   - **Network Share**: Place on internal file server
   - **USB Drives**: Copy to USB for offline distribution
   - **Intranet**: Host on internal web server
   - **Email**: Send to authorized users (if file size permits)
   - **Cloud Storage**: Upload to Google Drive/OneDrive/Dropbox

4. **Installation Instructions for Users**:
   ```
   1. Download GayaCollegeERP-Setup-1.0.0.exe
   2. Double-click to run
   3. If Windows blocks, click "More info" → "Run anyway"
   4. Follow installation wizard
   5. Launch from Start Menu or Desktop
   ```

### macOS Distribution (Optional)

```bash
npm run electron:build:mac
```

Generates:
- `GayaCollegeERP-1.0.0.dmg` - macOS disk image
- `GayaCollegeERP-1.0.0-mac.zip` - Zipped application

### Linux Distribution (Optional)

```bash
npm run electron:build:linux
```

Generates:
- `GayaCollegeERP-1.0.0.AppImage` - Universal Linux app
- `gaya-college-erp_1.0.0_amd64.deb` - Debian/Ubuntu package

## 🗄️ Database Management

### Backup Strategy

**Automated Daily Backups**:
```bash
# Create backup script
cat > /usr/local/bin/backup-gaya-erp.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/backup/gaya-erp"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

pg_dump gaya_erp | gzip > $BACKUP_DIR/gaya_erp_$DATE.sql.gz

# Keep only last 30 days
find $BACKUP_DIR -type f -mtime +30 -delete
EOF

chmod +x /usr/local/bin/backup-gaya-erp.sh

# Add to crontab (runs daily at 2 AM)
(crontab -l 2>/dev/null; echo "0 2 * * * /usr/local/bin/backup-gaya-erp.sh") | crontab -
```

### Backup to Local PC (Windows Users)

**Option 1: Manual Backup via pgAdmin**
1. Open pgAdmin
2. Right-click database → Backup
3. Save to local folder

**Option 2: Command-line Backup** (if PostgreSQL installed locally)
```bash
pg_dump -U postgres gaya_erp > backup_$(date +%Y%m%d).sql
```

**Option 3: Automated Windows Backup**
Create `backup-database.bat`:
```batch
@echo off
set BACKUP_DIR=C:\Backups\GayaERP
set DATE=%date:~-4,4%%date:~-7,2%%date:~-10,2%
mkdir %BACKUP_DIR% 2>nul

pg_dump -U postgres gaya_erp > %BACKUP_DIR%\gaya_erp_%DATE%.sql
echo Backup completed: %BACKUP_DIR%\gaya_erp_%DATE%.sql
```

Schedule via Windows Task Scheduler.

### Restore Database

```bash
# From backup file
psql -U postgres gaya_erp < backup_file.sql

# Or from gzipped backup
gunzip < backup_file.sql.gz | psql -U postgres gaya_erp
```

## 📊 Monitoring & Maintenance

### Application Monitoring

**PM2 Monitoring**:
```bash
pm2 monit
pm2 logs gaya-erp
pm2 restart gaya-erp  # Restart if needed
```

### Database Monitoring

```sql
-- Check database size
SELECT pg_size_pretty(pg_database_size('gaya_erp'));

-- Check table sizes
SELECT 
    table_name,
    pg_size_pretty(pg_total_relation_size(quote_ident(table_name)))
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY pg_total_relation_size(quote_ident(table_name)) DESC;

-- Active connections
SELECT count(*) FROM pg_stat_activity;
```

### Log Management

```bash
# View application logs
pm2 logs gaya-erp --lines 100

# Clear logs
pm2 flush

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## 🔄 Updates & Rollback

### Deploying Updates

```bash
# Pull latest code
git pull origin main

# Install dependencies
npm install

# Build
npm run build

# Restart application
pm2 restart gaya-erp
```

### Rollback Procedure

```bash
# View commits
git log --oneline

# Rollback to specific commit
git checkout <commit-hash>

# Rebuild and restart
npm install
npm run build
pm2 restart gaya-erp
```

## 🔐 Security Best Practices

### Production Security Checklist

- [ ] **HTTPS Only**: Enforce SSL/TLS
- [ ] **Strong Secrets**: Use cryptographically random SESSION_SECRET
- [ ] **Database**: Use strong passwords, restrict access
- [ ] **Firewall**: Configure UFW or cloud firewall rules
- [ ] **Updates**: Keep system and packages updated
- [ ] **Backups**: Automated daily backups tested regularly
- [ ] **Access Control**: Limit SSH access, use key-based auth
- [ ] **Monitoring**: Set up uptime monitoring
- [ ] **Rate Limiting**: Implement API rate limits (optional)

### Firewall Configuration

```bash
# Enable firewall
sudo ufw enable

# Allow required ports
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS
sudo ufw allow 5432/tcp # PostgreSQL (if remote)

# Check status
sudo ufw status
```

## 📞 Support & Troubleshooting

### Common Issues

**Application won't start**:
- Check environment variables: `cat .env`
- Check logs: `pm2 logs gaya-erp`
- Verify database connection: `psql $DATABASE_URL`

**Database connection errors**:
- Verify DATABASE_URL format
- Check PostgreSQL is running: `sudo systemctl status postgresql`
- Check firewall rules

**Build failures**:
- Clear cache: `rm -rf node_modules dist && npm install`
- Check Node.js version: `node --version` (should be 18+)

### Performance Optimization

- Enable gzip compression in Nginx
- Set up CDN for static assets
- Enable database connection pooling
- Optimize database indexes
- Monitor and adjust resources

## 📝 Production Environment Variables

```env
# PRODUCTION SETTINGS
NODE_ENV=production
PORT=5000

# Database (use production credentials)
DATABASE_URL=postgresql://prod_user:strong_password@prod-db:5432/gaya_erp

# Strong random secret (generate with: openssl rand -base64 32)
SESSION_SECRET=your-production-secret-here

# Optional services
OPENAI_API_KEY=sk-prod-key-if-using-chatbot

# Frontend URL for CORS
FRONTEND_URL=https://erp.gayacollege.edu
```

---

## ✅ Post-Deployment Verification

After deployment, verify:

1. ✅ Application loads successfully
2. ✅ Login works for both teachers and students
3. ✅ Database operations work (create, read, update)
4. ✅ File uploads work (if using object storage)
5. ✅ All pages load without errors
6. ✅ HTTPS certificate is valid
7. ✅ Backups are running automatically
8. ✅ Monitoring is active

## 📧 Support

For deployment issues:
- Email: it@gayacollege.edu
- Phone: [Department Contact]
- Internal: [Support Portal]

---

**Remember**: Always test in a staging environment before deploying to production!
