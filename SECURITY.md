# 🔒 Security Policy

## Reporting Security Vulnerabilities

If you discover a security vulnerability within the Gaya College ERP System, please:

1. **DO NOT** disclose it publicly
2. Email the security team at: security@gayacollege.edu
3. Provide detailed information about the vulnerability
4. Allow reasonable time for a fix before public disclosure

## Critical Security Measures

### 🔐 Required Configuration
- **SESSION_SECRET REQUIRED**: Application will fail to start if SESSION_SECRET environment variable is not set
- **No Insecure Fallbacks**: No hardcoded secrets or fallback values
- **Public Registration Disabled**: Teachers must be created via seed script; students created by teachers only

### 🚫 Disabled Features for Security
- **Public Registration Endpoint**: Returns 403 Forbidden to prevent unauthorized account creation
- **Self-Service Teacher Creation**: Teachers can only be created by administrators via seed script or database

## Security Features

### Authentication & Authorization

#### JWT Token-Based Authentication
- **HTTP-only cookies** - Tokens stored securely, not accessible via JavaScript
- **7-day expiration** - Automatic token expiry for security
- **Secure flag in production** - HTTPS-only cookie transmission
- **bcrypt password hashing** - Industry-standard password encryption with salt rounds

#### Role-Based Access Control (RBAC)
- **Two distinct roles**: Teacher and Student
- **Middleware enforcement**: `requireRole()` checks on all protected routes
- **Resource ownership**: Students can only access their own data
- **Fine-grained permissions**: Different access levels per role

### API Security

#### Input Validation
```typescript
// All inputs validated with Zod schemas
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  // ...
});

const data = schema.parse(req.body); // Throws if invalid
```

#### SQL Injection Prevention
- **Drizzle ORM** - All queries use parameterized statements
- **No raw SQL** - Type-safe query builder prevents injection
- **Schema validation** - Database-level constraints

#### XSS Protection
- **Content sanitization** - User input sanitized before storage
- **React automatic escaping** - JSX prevents XSS by default
- **CSP headers** - Content Security Policy (recommended for production)

#### CSRF Protection
- **SameSite cookies** - Prevents cross-site request forgery
- **HTTP-only flags** - Cookies not accessible to JavaScript

### Database Security

#### Connection Security
```env
# Always use SSL for production databases
DATABASE_URL=postgresql://user:pass@host:5432/db?sslmode=require
```

#### Access Control
- **Least privilege principle** - Database user has only required permissions
- **Foreign key constraints** - Referential integrity enforced
- **Audit logging** - All critical actions logged with user ID and timestamp

#### Data Protection
- **Password hashing** - bcrypt with 10 salt rounds
- **No plaintext secrets** - Environment variables for sensitive data
- **Data encryption at rest** - PostgreSQL supports column-level encryption

### Session Management

```typescript
// Session configuration
{
  httpOnly: true,              // JavaScript cannot access cookie
  secure: NODE_ENV === "production",  // HTTPS only in production
  sameSite: "strict",          // CSRF protection
  maxAge: 7 * 24 * 60 * 60 * 1000,    // 7 days
}
```

### Rate Limiting (Recommended for Production)

```typescript
// Example implementation (not yet included)
import rateLimit from "express-rate-limit";

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  message: "Too many login attempts, please try again later"
});

app.use("/api/auth/login", authLimiter);
```

## Security Best Practices

### Environment Variables

#### Required Secrets
```env
# CRITICAL: Change these in production!
SESSION_SECRET=use-openssl-rand-base64-32-to-generate

# Database with SSL
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require

# Optional but recommended
OPENAI_API_KEY=sk-your-key-here
```

#### Generating Strong Secrets
```bash
# Generate a strong session secret
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Password Policy

#### Current Requirements
- Minimum 6 characters
- No maximum limit
- All characters allowed

#### Recommended Enhancements
```typescript
const passwordSchema = z.string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain uppercase letter")
  .regex(/[a-z]/, "Password must contain lowercase letter")
  .regex(/[0-9]/, "Password must contain number")
  .regex(/[^A-Za-z0-9]/, "Password must contain special character");
```

### HTTPS/SSL

#### Production Deployment
```nginx
# Nginx configuration for HTTPS
server {
    listen 443 ssl http2;
    server_name erp.gayacollege.edu;
    
    ssl_certificate /etc/letsencrypt/live/erp.gayacollege.edu/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/erp.gayacollege.edu/privkey.pem;
    
    # Strong SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256';
    ssl_prefer_server_ciphers off;
    
    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name erp.gayacollege.edu;
    return 301 https://$server_name$request_uri;
}
```

### Security Headers

```typescript
// Add to Express app (recommended)
import helmet from "helmet";

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
  },
}));
```

### File Upload Security (If Implementing)

```typescript
// Example secure file upload
const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
});
```

## Audit Logging

### What's Logged
- User login/logout
- Student creation, updates, archival
- Attendance marking
- Grade entry
- Exam submissions
- Failed authentication attempts (recommended)

### Log Structure
```typescript
{
  entityType: "student",
  entityId: "uuid",
  action: "update",
  oldValue: { ... },
  newValue: { ... },
  performedBy: "user-uuid",
  performedAt: "2024-11-03T12:00:00Z"
}
```

### Viewing Audit Logs
```sql
-- Recent actions by user
SELECT * FROM audit_logs 
WHERE performed_by = 'user-id' 
ORDER BY performed_at DESC 
LIMIT 50;

-- All changes to specific entity
SELECT * FROM audit_logs 
WHERE entity_type = 'student' 
  AND entity_id = 'student-id'
ORDER BY performed_at DESC;
```

## Common Security Vulnerabilities & Mitigations

### ✅ SQL Injection
**Status**: Protected  
**Mitigation**: Drizzle ORM with parameterized queries

### ✅ XSS (Cross-Site Scripting)
**Status**: Protected  
**Mitigation**: React JSX auto-escaping, input sanitization

### ✅ CSRF (Cross-Site Request Forgery)
**Status**: Protected  
**Mitigation**: SameSite cookies, HTTP-only flags

### ✅ Authentication Bypass
**Status**: Protected  
**Mitigation**: JWT middleware on all protected routes

### ✅ Broken Access Control
**Status**: Protected  
**Mitigation**: Role-based middleware, resource ownership checks

### ⚠️ Brute Force Attacks
**Status**: Needs Enhancement  
**Recommendation**: Implement rate limiting on login endpoint

### ⚠️ Session Fixation
**Status**: Low Risk  
**Mitigation**: JWT tokens regenerated on login

## Security Checklist for Deployment

### Pre-Production

- [ ] **Change SESSION_SECRET** to cryptographically random value
- [ ] **Enable HTTPS** with valid SSL certificate
- [ ] **Update default credentials** for teacher/student accounts
- [ ] **Configure CORS** to allow only your domain
- [ ] **Enable rate limiting** on authentication endpoints
- [ ] **Set up error monitoring** (e.g., Sentry)
- [ ] **Configure database backups** with encryption
- [ ] **Review and minimize database permissions**
- [ ] **Enable audit logging** for all critical operations
- [ ] **Test authentication flows** thoroughly

### Post-Deployment

- [ ] **Monitor logs** for suspicious activity
- [ ] **Regular security updates** for dependencies
- [ ] **Periodic password changes** for admin accounts
- [ ] **Review access logs** monthly
- [ ] **Test backup restoration** quarterly
- [ ] **Security audit** annually

## Dependency Security

### Checking for Vulnerabilities
```bash
# Check for known vulnerabilities
npm audit

# Fix automatically (if safe)
npm audit fix

# View detailed report
npm audit --production
```

### Updating Dependencies
```bash
# Check for outdated packages
npm outdated

# Update all dependencies
npm update

# Update to latest major versions (be careful!)
npx npm-check-updates -u
npm install
```

### Security-Critical Dependencies
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT tokens
- `express` - Web framework
- `drizzle-orm` - Database ORM
- `zod` - Input validation

## Incident Response

### In Case of Security Breach

1. **Immediate Actions**:
   - Take affected systems offline
   - Change all credentials and secrets
   - Review audit logs for extent of breach
   - Notify affected users

2. **Investigation**:
   - Identify attack vector
   - Determine data accessed/compromised
   - Document timeline of events

3. **Remediation**:
   - Patch vulnerabilities
   - Restore from clean backups if needed
   - Implement additional security measures

4. **Post-Incident**:
   - Conduct security review
   - Update security policies
   - Train staff on new procedures

## Contact

For security concerns:
- **Email**: security@gayacollege.edu
- **Emergency**: [Phone Number]
- **Internal**: IT Department

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Express Security Guide](https://expressjs.com/en/advanced/best-practice-security.html)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)

---

**Last Updated**: November 2024  
**Version**: 1.0.0
