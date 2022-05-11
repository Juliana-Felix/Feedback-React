import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "be4f1462a4be85",
    pass: "14d9ea1bd73735"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com>',
    to: 'Diego Fernandes <julygomesfs@gmail.com>',
    subject,
    html: body,
  });
  }
}