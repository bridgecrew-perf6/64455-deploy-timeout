import { get, pick, getTranslation } from '@foundation/next';

import nodemailer from 'nodemailer';

import { defaultLocale } from '@root/i18n';

import appConfig from '@app/config/app';

const merge = (locale, item) => {
  const base = get(item, ['i18n', defaultLocale], {});
  const lang = get(item, ['i18n', locale], {});
  return { ...base, ...lang };
};

// Email HTML body

const html = ({ t, name, url, escapedEmail, colors = {} }) => {
  // Some simple styling options
  const backgroundColor = colors.backgroundColor ?? '#f9f9f9';
  const textColor = colors.textColor ?? '#444444';
  const mainBackgroundColor = colors.mainBackgroundColor ?? '#ffffff';
  const buttonBackgroundColor = colors.buttonBackgroundColor ?? '#346df1';
  const buttonBorderColor = colors.buttonBorderColor ?? '#346df1';
  const buttonTextColor = colors.buttonTextColor ?? '#ffffff';

  return `
<body style="background: ${backgroundColor};">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center" style="padding: 10px 0px 20px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        <strong>${name}</strong>
      </td>
    </tr>
  </table>
  <table width="100%" border="0" cellspacing="20" cellpadding="0" style="background: ${mainBackgroundColor}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center" style="padding: 10px 0px 0px 0px; font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
      ${t('email.verification.signInAs')} <strong>${escapedEmail}</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${buttonBackgroundColor}">
            <a href="${url}" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${buttonTextColor}; text-decoration: none; text-decoration: none;border-radius: 5px; padding: 10px 20px; border: 1px solid ${buttonBorderColor}; display: inline-block; font-weight: bold;">
              ${t('email.signIn.button')}
            </a>
          </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        ${t('email.verification.ignoreMessage')}
      </td>
    </tr>
  </table>
</body>
`;
};

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)

const text = ({ subject, url }) => `${subject}\n${url}\n\n`;

export const sendVerificationRequest = ({
  identifier: email,
  url,
  baseUrl,
  provider,
  content = {},
  locale = defaultLocale,
  ...options
}) => {
  return new Promise((resolve, reject) => {
    const { server, from } = provider;
    // Strip protocol from URL and use domain as site name
    const site = baseUrl.replace(/^https?:\/\//, '');

    const base = merge(locale, appConfig.base);

    getTranslation(locale, 'auth').then(t => {
      const params = {
        ...base,
        url,
        site,
        email,
        locale,
        shop: pick(appConfig.shop ?? {}, ['address', 'contact', 'social']),
        ...options,
        t,
      };

      params.subject = t('email.verification.subject', params);

      params.escapedEmail = `${params.email.replace(/\./g, '&#8203;.')}`;
      params.escapedSite = `${params.site.replace(/\./g, '&#8203;.')}`;

      nodemailer.createTransport(server).sendMail(
        {
          to: email,
          from,
          subject: content.subject?.(params) ?? params.subject,
          text: content.text?.(params) ?? text(params),
          html: content.html?.(params) ?? html(params),
        },
        error => {
          if (error) {
            return reject(new Error('SEND_VERIFICATION_EMAIL_ERROR', error));
          }
          return resolve();
        }
      );
    }, reject);
  });
};
