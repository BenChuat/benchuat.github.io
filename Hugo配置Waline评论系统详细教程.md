# Hugo 配置 Waline 评论系统详细教程

## 📋 目录

1. [什么是 Waline](#什么是-waline)
2. [前置准备](#前置准备)
3. [服务端部署](#服务端部署)
4. [Hugo 项目配置](#hugo-项目配置)
5. [功能配置](#功能配置)
6. [常见问题](#常见问题)

---

## 什么是 Waline

**Waline** 是一款基于 Valine 衍生的简洁、安全的评论系统。它支持：

- ✅ 多种登录方式（GitHub、QQ、微信、微博等）
- ✅ 评论、点赞、通知功能
- ✅ Markdown 支持
- ✅ 邮件通知
- ✅ 数据完全自主控制
- ✅ 支持自托管部署

---

## 前置准备

### 1. 服务器要求

- 一台公网可访问的服务器（NAS 或 VPS）
- 已安装 Node.js（推荐 14.x 或更高版本）
- 已安装数据库（MySQL、PostgreSQL、SQLite 或 MongoDB）

### 2. 数据库准备

根据你使用的数据库类型，创建相应的数据库和表：

#### MySQL/PostgreSQL

```sql
-- 创建数据库
CREATE DATABASE waline CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 使用数据库
USE waline;
```

Waline 会自动创建所需的表，无需手动创建。

#### SQLite

SQLite 无需额外配置，Waline 会自动创建数据库文件。

---

## 服务端部署

### 方法一：使用 Docker 部署（推荐）

#### 1. 创建 Docker Compose 配置

创建 `docker-compose.yml` 文件：

```yaml
version: '3.8'

services:
  waline:
    image: lizheming/waline:latest
    container_name: waline
    restart: always
    ports:
      - "8360:8360"  # 映射端口，可根据需要修改
    environment:
      # 数据库配置（MySQL 示例）
      - MYSQL_HOST=your_mysql_host
      - MYSQL_PORT=3306
      - MYSQL_DB=waline
      - MYSQL_USER=waline_user
      - MYSQL_PASSWORD=your_password
      
      # 或者使用 PostgreSQL
      # - POSTGRES_HOST=your_postgres_host
      # - POSTGRES_PORT=5432
      # - POSTGRES_DB=waline
      # - POSTGRES_USER=waline_user
      # - POSTGRES_PASSWORD=your_password
      
      # 或者使用 SQLite（无需额外配置）
      # - SQLITE_PATH=/app/data/waline.db
      
      # 站点配置
      - SITE_NAME=你的博客名称
      - SITE_URL=https://your-blog-domain.com
      - SECURE_DOMAINS=your-blog-domain.com
      
      # 邮件通知配置（可选）
      - SMTP_HOST=smtp.example.com
      - SMTP_PORT=587
      - SMTP_USER=your_email@example.com
      - SMTP_PASSWORD=your_email_password
      - SMTP_FROM=your_email@example.com
      
      # 管理员账号（首次登录后可在后台修改）
      - ADMIN_EMAIL=admin@example.com
      - ADMIN_PASSWORD=your_admin_password
      
      # 其他配置
      - AUTHOR_EMAIL=author@example.com  # 作者邮箱
      - LANGUAGE=zh-CN  # 语言设置
    volumes:
      - ./data:/app/data  # 数据持久化（SQLite 需要）
```

#### 2. 启动服务

```bash
docker-compose up -d
```

#### 3. 验证部署

访问 `http://your-server-ip:8360` 查看 Waline 管理后台。

### 方法二：使用 Node.js 直接部署

#### 1. 安装 Waline

```bash
npm install -g @waline/vercel
```

#### 2. 创建配置文件

创建 `waline.config.js`：

```javascript
module.exports = {
  // 数据库配置
  database: {
    provider: 'mysql',  // 可选: mysql, postgres, sqlite, mongodb
    host: 'your_mysql_host',
    port: 3306,
    database: 'waline',
    user: 'waline_user',
    password: 'your_password',
  },
  
  // 站点配置
  siteName: '你的博客名称',
  siteUrl: 'https://your-blog-domain.com',
  
  // 邮件配置（可选）
  smtp: {
    host: 'smtp.example.com',
    port: 587,
    user: 'your_email@example.com',
    password: 'your_email_password',
    from: 'your_email@example.com',
  },
  
  // 管理员配置
  admin: {
    email: 'admin@example.com',
    password: 'your_admin_password',
  },
  
  // 语言设置
  lang: 'zh-CN',
};
```

#### 3. 启动服务

```bash
waline start
```

### 方法三：使用 Nginx 反向代理（推荐生产环境）

#### 1. 配置 Nginx

编辑 Nginx 配置文件：

```nginx
server {
    listen 80;
    server_name waline.your-domain.com;  # 你的 Waline 域名
    
    location / {
        proxy_pass http://localhost:8360;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

#### 2. 配置 SSL（可选但推荐）

使用 Let's Encrypt 配置 HTTPS：

```bash
certbot --nginx -d waline.your-domain.com
```

---

## Hugo 项目配置

### 1. 创建评论模板文件

在 Hugo 项目根目录创建 `layouts/partials/comments.html`：

```html
{{- if .Site.Params.waline.enable | default false -}}
<div id="waline-container"></div>
<link rel="stylesheet" href="{{ .Site.Params.waline.cssURL | default "https://unpkg.com/@waline/client@v2/dist/waline.css" }}" />
<script type="module">
  import { init } from '{{ .Site.Params.waline.jsURL | default "https://unpkg.com/@waline/client@v2/dist/waline.mjs" }}';
  
  init({
    el: '#waline-container',
    serverURL: '{{ .Site.Params.waline.serverURL }}',
    {{- if .Site.Params.waline.lang }}
    lang: '{{ .Site.Params.waline.lang }}',
    {{- end }}
    {{- if .Site.Params.waline.emoji }}
    emoji: {{ .Site.Params.waline.emoji }},
    {{- end }}
    {{- if .Site.Params.waline.requiredMeta }}
    requiredMeta: {{ .Site.Params.waline.requiredMeta }},
    {{- end }}
    {{- if .Site.Params.waline.wordLimit }}
    wordLimit: {{ .Site.Params.waline.wordLimit }},
    {{- end }}
    {{- if .Site.Params.waline.pageSize }}
    pageSize: {{ .Site.Params.waline.pageSize }},
    {{- end }}
    {{- if .Site.Params.waline.imageUploader }}
    imageUploader: {{ .Site.Params.waline.imageUploader }},
    {{- end }}
    {{- if .Site.Params.waline.highlight }}
    highlight: {{ .Site.Params.waline.highlight }},
    {{- end }}
    {{- if .Site.Params.waline.math }}
    math: {{ .Site.Params.waline.math }},
    {{- end }}
    {{- if .Site.Params.waline.login }}
    login: '{{ .Site.Params.waline.login }}',
    {{- end }}
    {{- if .Site.Params.waline.visitor }}
    visitor: {{ .Site.Params.waline.visitor }},
    {{- end }}
    {{- if .Site.Params.waline.reaction }}
    reaction: {{ .Site.Params.waline.reaction }},
    {{- end }}
    {{- if .Site.Params.waline.comment }}
    comment: {{ .Site.Params.waline.comment }},
    {{- end }}
    {{- if .Site.Params.waline.pageview }}
    pageview: {{ .Site.Params.waline.pageview }},
    {{- end }}
    {{- if .Site.Params.waline.dark }}
    dark: '{{ .Site.Params.waline.dark }}',
    {{- end }}
    {{- if .Site.Params.waline.locale }}
    locale: {{ .Site.Params.waline.locale }},
    {{- end }}
    path: '{{ .RelPermalink }}',
  });
</script>
{{- end -}}
```

### 2. 配置参数文件

编辑 `config/_default/params.toml`，添加以下配置：

```toml
# ============ 评论系统配置 ============

[article]
  # 启用评论功能（全局设置）
  showComments = true

# Waline 评论系统配置
[waline]
  # 是否启用 Waline
  enable = true
  
  # Waline 服务端地址（必填）
  # 格式: http://your-waline-server:8360 或 https://waline.your-domain.com
  serverURL = "http://your-nas-ip:8360"  # 请替换为你的实际地址
  
  # CDN 地址（可选，使用默认即可）
  # cssURL = "https://unpkg.com/@waline/client@v2/dist/waline.css"
  # jsURL = "https://unpkg.com/@waline/client@v2/dist/waline.mjs"
  
  # 语言设置（可选，默认自动检测）
  lang = "zh-CN"  # 可选: zh-CN, en-US, zh-TW, pt-BR, ru-RU, jp-JP, es-ES
  
  # 表情设置（可选）
  # emoji = ["https://unpkg.com/@waline/emojis@1.1.0/weibo", "https://unpkg.com/@waline/emojis@1.1.0/qq", "https://unpkg.com/@waline/emojis@1.1.0/bilibili"]
  
  # 必填信息（可选）
  # requiredMeta = ["nick", "mail"]  # 可选: nick, mail, link
  
  # 字数限制（可选）
  # wordLimit = 0  # 0 表示不限制
  
  # 每页评论数（可选）
  # pageSize = 10
  
  # 登录方式（可选）
  # login = "enable"  # enable: 启用登录, disable: 禁用登录, force: 强制登录
  
  # 访问量统计（可选）
  # visitor = true
  
  # 表情反应（可选）
  # reaction = true
  
  # 评论功能（可选）
  # comment = true
  
  # 浏览量统计（可选）
  # pageview = true
  
  # 暗色模式（可选）
  # dark = "auto"  # auto: 自动, "dark": 强制暗色, "light": 强制亮色
```

### 3. 单篇文章控制

如果只想在特定文章显示评论，可以在文章 Front Matter 中设置：

```markdown
---
title: "文章标题"
date: 2024-01-01
showComments: true  # 启用评论
---
```

或者禁用评论：

```markdown
---
title: "文章标题"
date: 2024-01-01
showComments: false  # 禁用评论
---
```

---

## 功能配置

### 1. 邮件通知配置

在服务端配置文件中添加 SMTP 设置：

```javascript
smtp: {
  host: 'smtp.example.com',      // SMTP 服务器地址
  port: 587,                      // SMTP 端口（587 或 465）
  secure: false,                  // 是否使用 TLS（587 用 false，465 用 true）
  user: 'your_email@example.com', // 发件邮箱
  password: 'your_email_password', // 邮箱密码或授权码
  from: 'your_email@example.com', // 发件人地址
  fromName: '你的博客名称',        // 发件人名称
}
```

### 2. 登录方式配置

Waline 支持多种登录方式，需要在服务端配置：

- **GitHub**: 需要创建 GitHub OAuth App
- **QQ**: 需要 QQ 互联应用
- **微信**: 需要微信开放平台应用
- **微博**: 需要微博开放平台应用

具体配置方法请参考 [Waline 官方文档](https://waline.js.org/guide/client/basic.html)。

### 3. 自定义样式

可以在 `layouts/partials/comments.html` 中添加自定义 CSS：

```html
<style>
  /* 自定义 Waline 样式 */
  #waline-container {
    max-width: 100%;
  }
  
  .wl-card {
    border-radius: 8px;
  }
</style>
```

### 4. 多语言支持

如果你的博客支持多语言，可以在不同语言的配置文件中设置不同的 `lang` 参数：

```toml
# config/_default/languages.zh-cn.toml
[params.waline]
  lang = "zh-CN"

# config/_default/languages.en.toml
[params.waline]
  lang = "en-US"
```

---

## 常见问题

### 1. 评论不显示

**可能原因：**
- `serverURL` 配置错误
- 服务端未正常启动
- 网络连接问题（跨域）

**解决方法：**
- 检查服务端地址是否正确
- 确认服务端已启动并可以访问
- 在服务端配置中添加允许的域名：

```javascript
secureDomains: ['your-blog-domain.com']
```

### 2. 跨域问题

如果遇到跨域错误，需要在服务端配置 CORS：

```javascript
cors: {
  origin: ['https://your-blog-domain.com'],
  credentials: true,
}
```

### 3. 数据库连接失败

**可能原因：**
- 数据库地址、端口、用户名、密码错误
- 数据库未创建
- 防火墙阻止连接

**解决方法：**
- 检查数据库配置信息
- 确认数据库已创建
- 检查防火墙规则

### 4. 邮件通知不工作

**可能原因：**
- SMTP 配置错误
- 邮箱未开启 SMTP 服务
- 使用了应用专用密码而非登录密码

**解决方法：**
- 检查 SMTP 配置
- 确认邮箱已开启 SMTP/POP3 服务
- 使用应用专用密码（如 Gmail）

### 5. 管理员无法登录

**解决方法：**
- 首次部署后，使用配置的 `ADMIN_EMAIL` 和 `ADMIN_PASSWORD` 登录
- 登录后可在后台修改密码
- 如果忘记密码，可以重置数据库或重新部署

---

## 参考资源

- [Waline 官方文档](https://waline.js.org/)
- [Waline GitHub](https://github.com/walinejs/waline)
- [Waline 客户端配置](https://waline.js.org/guide/client/basic.html)
- [Waline 服务端配置](https://waline.js.org/guide/server/basic.html)

---

## 总结

配置 Waline 评论系统主要分为三个步骤：

1. **服务端部署**：在 NAS 或服务器上部署 Waline 服务
2. **数据库配置**：配置数据库连接
3. **Hugo 集成**：在 Hugo 项目中添加评论模板和配置

完成以上步骤后，你的博客就可以使用功能丰富的 Waline 评论系统了！

---

**最后更新：** 2024年

**作者：** BenChuat

