import os
import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
import logging

logger = logging.getLogger(__name__)

router = APIRouter(tags=["contact"])

# SMTP Configuration - Yildizay Mail Server
SMTP_HOST = "mail.yildizay.com.tr"
SMTP_PORT = 587
SMTP_USER = "noreply@yildizay.com.tr"
SMTP_PASSWORD = "O1es9Lz@_lB3@V@6"
SMTP_FROM = "noreply@yildizay.com.tr"
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
        
        # Email body HTML
        html_body = f"""
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                    <h2 style="color: #c9302c; border-bottom: 2px solid #f0ad4e; padding-bottom: 10px;">
                        Yeni İletişim Formu Mesajı
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
        
        # Send email with GoDaddy SMTP settings
        # emailSSLEnable: false - Port 587 with STARTTLS
        try:
            # Create SMTP connection
            smtp = aiosmtplib.SMTP(
                hostname=SMTP_HOST,
                port=SMTP_PORT,
                timeout=60
            )
            
            logger.info("Connecting to SMTP server...")
            await smtp.connect()
            
            # Check if STARTTLS is available and start it
            if smtp.is_connected and not smtp.is_ehlo_or_helo_needed:
                logger.info("Starting TLS...")
                try:
                    await smtp.starttls()
                except aiosmtplib.SMTPException as tls_error:
                    # If STARTTLS fails because TLS already active, continue
                    logger.warning(f"STARTTLS warning: {str(tls_error)}")
            
            logger.info("Logging in...")
            await smtp.login(SMTP_USER, SMTP_PASSWORD)
            
            logger.info("Sending message...")
            await smtp.send_message(message)
            
            logger.info("Closing connection...")
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
