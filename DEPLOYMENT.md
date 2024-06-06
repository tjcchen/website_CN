## Remote Server

```bash
# login to remote server
ssh root@182.92.180.143

# bootstrap server with pm2
pm2 --name https-server start npm -- start

# scp
scp ssl/cert.key root@182.92.180.143:/ssl2/
scp ssl/cert.pem root@182.92.180.143:/ssl2/
```
