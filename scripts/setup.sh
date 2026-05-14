#!/bin/bash
dnf install -y httpd
systemctl enable httpd
chown -R apache:apache /var/www/html/
chmod -R 755 /var/www/html/
