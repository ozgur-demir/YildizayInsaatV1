import os
import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
import logging

logger = logging.getLogger(__name__)

router = APIRouter(tags=["contact"])

# SMTP Configuration - GoDaddy Settings
SMTP_HOST = "smtpout.secureserver.net"
SMTP_PORT = 587
SMTP_USER = "info@ozdsystems.com"
SMTP_PASSWORD = "Konsopia123@"
SMTP_FROM = "info@ozdsystems.com"
RECIPIENTS = ["sahin@yildizay.com.tr", "info@csyolu.com"]
SMTP_SSL_ENABLE = False  # emailSSLEnable: false

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
        message['Subject'] = f'Yeni İletişim Formu - {form.name}'
        message['From'] = SMTP_FROM
        message['To'] = ', '.join(RECIPIENTS)
        
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
        # emailSSLEnable: false - Don't use direct SSL/TLS, use STARTTLS
        smtp = aiosmtplib.SMTP(
            hostname=SMTP_HOST,
            port=SMTP_PORT,
            use_tls=False,  # No direct TLS connection
            start_tls=True,  # Use STARTTLS after connection
            timeout=60
        )
        
        await smtp.connect()
        await smtp.login(SMTP_USER, SMTP_PASSWORD)
        await smtp.send_message(message)
        await smtp.quit()
        
        logger.info(f"Contact form email sent successfully from {form.email}")
        return {
            "success": True,
            "message": "Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız."
        }
        
    except Exception as e:
        logger.error(f"Failed to send contact email: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="E-posta gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin."
        )
