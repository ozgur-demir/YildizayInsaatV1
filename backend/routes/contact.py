import os
import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel, EmailStr
import logging
from datetime import datetime, timedelta
from collections import defaultdict

logger = logging.getLogger(__name__)

router = APIRouter(tags=["contact"])

# Rate limiting - In-memory storage
# Format: {ip_address: [timestamp1, timestamp2, ...]}
rate_limit_store = defaultdict(list)
RATE_LIMIT_WINDOW = 300  # 5 minutes in seconds
RATE_LIMIT_MAX_REQUESTS = 3  # Max 3 requests per 5 minutes per IP

# SMTP Configuration - Yildizay Mail Server
SMTP_HOST = "mail.yildizay.com.tr"
SMTP_PORT = 587
SMTP_USER = "no-reply@yildizay.com.tr"  # Fixed: with hyphen
SMTP_PASSWORD = "O1es9Lz@_lB3@V@6"
SMTP_FROM = "no-reply@yildizay.com.tr"  # Fixed: with hyphen
SMTP_FROM_NAME = "Yildizay WebApp"
RECIPIENTS = ["sahin@yildizay.com.tr", "info@csyolu.com"]
SMTP_SSL_ENABLE = False  # EnableSsl: false
USE_DEFAULT_CREDENTIALS = False  # UseDefaultCredentials: false

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    phone: str = None
    message: str

@router.post("/send")
async def send_contact_email(form: ContactForm):
    """Send contact form email"""
    try:
        # Create email message
        message = MIMEMultipart('alternative')
        message['Subject'] = 'İletişim Talebi'
        message['From'] = f'{SMTP_FROM_NAME} <{SMTP_FROM}>'
        message['To'] = ', '.join(RECIPIENTS)
        message['Priority'] = 'urgent'  # MailPriority.High
        
        # Email body HTML (as per C# code - IsBodyHtml = true)
        html_body = f"""
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                    <h2 style="color: #c9302c; border-bottom: 2px solid #f0ad4e; padding-bottom: 10px;">
                        İletişim Talebi
                    </h2>
                    <div style="margin: 20px 0;">
                        <p><strong>Ad Soyad:</strong> {form.name}</p>
                        <p><strong>E-posta:</strong> {form.email}</p>
                        {f'<p><strong>Telefon:</strong> {form.phone}</p>' if form.phone else ''}
                    </div>
                    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <h3 style="margin-top: 0; color: #555;">Mesaj:</h3>
                        <p style="white-space: pre-wrap;">{form.message}</p>
                    </div>
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #888;">
                        <p>Bu mesaj yildizay.com.tr iletişim formundan gönderilmiştir.</p>
                    </div>
                </div>
            </body>
        </html>
        """
        
        # Plain text version
        text_body = f"""
Yeni İletişim Formu Mesajı

Ad Soyad: {form.name}
E-posta: {form.email}
{f'Telefon: {form.phone}' if form.phone else ''}

Mesaj:
{form.message}

---
Bu mesaj yildizay.com.tr iletişim formundan gönderilmiştir.
        """
        
        # Attach both versions
        part1 = MIMEText(text_body, 'plain')
        part2 = MIMEText(html_body, 'html')
        message.attach(part1)
        message.attach(part2)
        
        # Send email with Yildizay SMTP settings
        # EnableSsl: false, UseDefaultCredentials: false, Port: 587
        try:
            logger.info(f"Connecting to {SMTP_HOST}:{SMTP_PORT}...")
            
            # Create SMTP connection (UseDefaultCredentials: false)
            smtp = aiosmtplib.SMTP(
                hostname=SMTP_HOST,
                port=SMTP_PORT,
                use_tls=False,  # EnableSsl: false - no direct TLS
                validate_certs=False,  # Skip SSL certificate verification
                timeout=60
            )
            
            await smtp.connect()
            logger.info("Connected successfully")
            
            # Login with credentials (UseDefaultCredentials: false)
            logger.info("Authenticating...")
            await smtp.login(SMTP_USER, SMTP_PASSWORD)
            logger.info("Authentication successful")
            
            # Send message
            logger.info("Sending email...")
            await smtp.send_message(message)
            logger.info("Email sent successfully")
            
            await smtp.quit()
            
            logger.info(f"Contact form email sent successfully from {form.email}")
            return {
                "success": True,
                "message": "Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız."
            }
        except aiosmtplib.SMTPException as smtp_error:
            logger.error(f"SMTP Error: {type(smtp_error).__name__} - {str(smtp_error)}")
            raise HTTPException(
                status_code=500,
                detail=f"SMTP hatası: {str(smtp_error)}"
            )
        
    except Exception as e:
        logger.error(f"Failed to send contact email: {type(e).__name__} - {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="E-posta gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin."
        )
