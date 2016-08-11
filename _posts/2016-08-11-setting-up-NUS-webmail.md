---
layout: post
title: Connecting your NUS and Personal Mail Account
---

In this demonstration I'll be using Gmail.

To connect your NUS Outlook and Gmail, you'll have to find out the SMTP server of the NUS Outlook account. This can be found under `Options > Mail > POP and IMAP`.

<amp-img width="600" height="400" src="/assets/images/nusmail/popimap.png"></amp-img>

Now, head over to your Gmail account, go to `Settings > Accounts and Import`. Click on `add another email address you own`.

<amp-img width="600" height="400" src="/assets/images/nusmail/nameemail.png"></amp-img>

Fill your details: a name, and your NUS email (e.g. E0034567@u.nus.edu). I ticked treat as alias, but this option is up to you. Read the link for more information. When done, click next.

<amp-img width="600" height="400" src="/assets/images/nusmail/smtp.png"></amp-img>

Your username is your email (`E0034567@u.nus.edu`) and your password is your NUSNET password. Check `secured connection using TLS`.

Try the SMTP server `smtp.office365.com` as shown in your NUS Outlook, and choose port 587. 

However, you may encounter an error with the SMTP server address, along the lines of taking too long to resolve something.

In this scenario, try filling in `outlook-apacnorth.office365.com` as your SMTP server. This is determined by running `dig smtp.office365.com` on the command line, and should not vary.

<amp-img width="600" height="400" src="/assets/images/nusmail/dig.png"></amp-img>

You should receive an email in your NUS mail with a confirmation code/link. Follow the instructions and you should be done.
