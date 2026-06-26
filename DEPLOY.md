# วิธี Deploy บน Oracle Cloud Free Tier (ฟรีตลอดชีพ)

## ขั้นตอนที่ 1 — สมัคร Oracle Cloud
1. ไปที่ https://www.oracle.com/cloud/free/
2. สมัครฟรี (ใช้บัตรเครดิตยืนยันตัวตน แต่ไม่ตัดเงิน)
3. สร้าง VM instance: **Ampere A1 Compute** (ARM)
   - Shape: VM.Standard.A1.Flex → 2 OCPU, 12 GB RAM (ฟรี)
   - OS: Ubuntu 22.04
   - เปิด port 80 และ 443 ใน Security List

## ขั้นตอนที่ 2 — ติดตั้ง Docker บน VM
```bash
ssh ubuntu@<IP_ของ_VM>

# ติดตั้ง Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker ubuntu
newgrp docker

# ติดตั้ง Docker Compose
sudo apt install docker-compose-plugin -y
```

## ขั้นตอนที่ 3 — โคลน repo และตั้งค่า
```bash
git clone https://github.com/<USERNAME>/<REPO>.git
cd <REPO>

# คัดลอกและแก้ไขไฟล์ .env
cp .env.production.example .env
nano .env
```
แก้ไข 3 ค่าในไฟล์ .env:
- `POSTGRES_PASSWORD` — รหัสผ่านฐานข้อมูล (ตั้งเองได้เลย)
- `SESSION_SECRET` — random string ยาวๆ
- `ACME_EMAIL` — อีเมลของคุณ (สำหรับ SSL)

## ขั้นตอนที่ 4 — ชี้ Domain มาที่ IP (ถ้ามี domain)
ถ้ามี domain: ตั้ง DNS A record ชี้มาที่ IP ของ VM

ถ้าไม่มี domain: ใช้ IP ตรงๆ ได้เลย (แต่ไม่มี HTTPS)

## ขั้นตอนที่ 5 — รัน!
```bash
docker compose up -d --build
```
รอสัก 3-5 นาที แล้วเปิดเว็บได้เลย 🎉

## คำสั่งที่ใช้บ่อย
```bash
docker compose logs -f api      # ดู log API
docker compose logs -f db       # ดู log Database
docker compose restart api      # restart API
docker compose down             # หยุดทุกอย่าง
docker compose up -d            # เริ่มใหม่
```

## Domain ฟรี (ถ้าไม่อยากซื้อ)
- https://freedns.afraid.org — ฟรี subdomain เช่น nantashop.mooo.com
- https://duckdns.org — ฟรี subdomain เช่น nantashop.duckdns.org
