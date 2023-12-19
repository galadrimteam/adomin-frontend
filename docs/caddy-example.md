This is an example of how to serve a SPA with Caddy

```
example.com {
		root * /var/www/example
		file_server
		try_files {path} {path}/ /index.html
}
```
