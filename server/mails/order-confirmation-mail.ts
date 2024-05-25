type OrderMailData = {
  _id: string;
  name: string;
  price: number;
  date: string;
};
// createPurchaseConfirmationMail.ts

const createPurchaseConfirmationMail = (order: OrderMailData) => {
  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <html lang="en">
  
    <head data-id="__react-email-head"></head>
    <div id="__react-email-preview" style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Course Purchase Confirmation<div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div>
    </div>
  
    <body data-id="__react-email-body" style="background-color:rgb(255,255,255);margin-top:auto;margin-bottom:auto;margin-left:auto;margin-right:auto;font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji">
      <table align="center" width="100%" data-id="__react-email-container" role="presentation" cellSpacing="0" cellPadding="0" border="0" style="max-width:37.5em;border-width:1px;border-style:solid;border-color:rgb(234,234,234);border-radius:0.25rem;margin-top:40px;margin-bottom:40px;margin-left:auto;margin-right:auto;padding:20px;width:465px">
        <tbody>
          <tr style="width:100%">
            <td>
              <table align="center" width="100%" data-id="react-email-section" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="margin-top:32px">
                <tbody>
                  <tr>
                    <td><img data-id="react-email-img" alt="Vercel" src="https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png" width="60" height="60" style="display:block;outline:none;border:none;text-decoration:none;margin-top:0px;margin-bottom:0px;margin-left:auto;margin-right:auto" /></td>
                  </tr>
                </tbody>
              </table>
              <h1 data-id="react-email-heading" style="color:rgb(0,0,0);font-size:24px;font-weight:400;text-align:center;padding:0px;margin-top:30px;margin-bottom:30px;margin-left:0px;margin-right:0px"><strong>Course Purchase Confirmation</strong></h1>
              <p data-id="react-email-text" style="font-size:14px;line-height:24px;margin:16px 0;color:rgb(0,0,0)">Hey there,</p>
              <p data-id="react-email-text" style="font-size:14px;line-height:24px;margin:16px 0;color:rgb(0,0,0)">Thank you for choosing Lincher as your eLearning platform. We are delighted to confirm your recent purchase of the course <strong>${order.name}.</strong></p>
              <p data-id="react-email-text" style="font-size:14px;line-height:24px;margin:16px 0;color:rgb(0,0,0)">You are one step closer to expanding your knowledge and enhancing your skills!</p>
              <hr data-id="react-email-hr" style="width:100%;border:none;border-top:1px solid #eaeaea;border-width:1px;border-style:solid;border-color:rgb(234,234,234);margin-top:26px;margin-bottom:26px;margin-left:0px;margin-right:0px" />
              <p data-id="react-email-text" style="font-size:14px;line-height:24px;margin:16px 0;color:rgb(0,0,0)"><strong>Order details:</strong></p>
              <p data-id="react-email-text" style="font-size:14px;line-height:24px;margin:16px 0;color:rgb(0,0,0)">Order #: <strong>${order._id}</strong></p>
              <p data-id="react-email-text" style="font-size:14px;line-height:24px;margin:16px 0;color:rgb(0,0,0)">Order date: <strong>${order.date}</strong></p>
              <p data-id="react-email-text" style="font-size:14px;line-height:24px;margin:16px 0;color:rgb(0,0,0)">Order name: <strong>${order.name}</strong></p>
              <p data-id="react-email-text" style="font-size:14px;line-height:24px;margin:16px 0;color:rgb(0,0,0)">Order price: <strong>${order.price}</strong></p>
              
              <hr data-id="react-email-hr" style="width:100%;border:none;border-top:1px solid #eaeaea;border-width:1px;border-style:solid;border-color:rgb(234,234,234);margin-top:26px;margin-bottom:26px;margin-left:0px;margin-right:0px" />
  
              <p data-id="react-email-text" style="font-size:12px;line-height:24px;margin:16px 0;color:rgb(102,102,102)">Thank you for being a part of our community!</p>
              <p data-id="react-email-text" style="font-size:12px;line-height:24px;margin:16px 0;color:rgb(102,102,102)">We wish you a successful learning journey with Lincher. Unlock your potential, achieve your goals, and excel in your chosen field!</p>
            </td>
          </tr>
        </tbody>
      </table>
    </body>
  
  </html>
    `;
};

// Export the createActivationMail function as default
export default createPurchaseConfirmationMail;
