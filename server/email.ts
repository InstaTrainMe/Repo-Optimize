import FormData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(FormData);

const NOTIFICATION_EMAIL = 'Sales@instatrainme.com';

function getMailgunClient() {
  if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
    console.warn('Mailgun not configured - email notifications disabled');
    return null;
  }
  return mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY
  });
}

export async function sendPartnerNotification(data: {
  companyName: string;
  contactName: string;
  email: string;
  organizationType: string;
  message?: string | null;
}) {
  const mg = getMailgunClient();
  if (!mg) return;

  const text = `New Partnership Inquiry

Company: ${data.companyName}
Contact Name: ${data.contactName}
Email: ${data.email}
Organization Type: ${data.organizationType}
Message: ${data.message || 'No message provided'}

---
This is an automated notification from InstaTrainMe.`;

  try {
    await mg.messages.create(process.env.MAILGUN_DOMAIN!, {
      from: `InstaTrainMe Notifications <noreply@${process.env.MAILGUN_DOMAIN}>`,
      to: NOTIFICATION_EMAIL,
      subject: `New Partnership Inquiry from ${data.companyName}`,
      text
    });
    console.log('Partner notification email sent');
  } catch (error) {
    console.error('Failed to send partner notification email:', error);
  }
}

export async function sendGymNotification(data: {
  gymName: string;
  location: string;
  email: string;
}) {
  const mg = getMailgunClient();
  if (!mg) return;

  const text = `New Gym Registration

Gym Name: ${data.gymName}
Location: ${data.location}
Email: ${data.email}

---
This is an automated notification from InstaTrainMe.`;

  try {
    await mg.messages.create(process.env.MAILGUN_DOMAIN!, {
      from: `InstaTrainMe Notifications <noreply@${process.env.MAILGUN_DOMAIN}>`,
      to: NOTIFICATION_EMAIL,
      subject: `New Gym Registration: ${data.gymName}`,
      text
    });
    console.log('Gym notification email sent');
  } catch (error) {
    console.error('Failed to send gym notification email:', error);
  }
}

export async function sendNewsletterNotification(email: string) {
  const mg = getMailgunClient();
  if (!mg) return;

  const text = `New Newsletter Subscription

Email: ${email}

---
This is an automated notification from InstaTrainMe.`;

  try {
    await mg.messages.create(process.env.MAILGUN_DOMAIN!, {
      from: `InstaTrainMe Notifications <noreply@${process.env.MAILGUN_DOMAIN}>`,
      to: NOTIFICATION_EMAIL,
      subject: `New Newsletter Subscription: ${email}`,
      text
    });
    console.log('Newsletter notification email sent');
  } catch (error) {
    console.error('Failed to send newsletter notification email:', error);
  }
}
