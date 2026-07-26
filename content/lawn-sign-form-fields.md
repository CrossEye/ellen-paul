# Lawn-Sign Google Form, field map

Existing form: **"Request a Lawn Sign"** (300 signs, distributed August; two versions, picture or logo).

- **View URL:** https://docs.google.com/forms/d/e/1FAIpQLSdsrTGPbkShDxJ9sKSYoBtU5tnonhBhjpqINTARTmzK3ffNBA/viewform
- **POST endpoint (for our own UI):** https://docs.google.com/forms/d/e/1FAIpQLSdsrTGPbkShDxJ9sKSYoBtU5tnonhBhjpqINTARTmzK3ffNBA/formResponse

## Fields → entry IDs

| Field | Type | Required | Field name to POST |
|---|---|---|---|
| Name | short text | yes | `entry.1420143167` |
| Cell Phone | short text | yes | `entry.1717773796` |
| What town is the sign for? | choice | yes | `entry.2030510207`, Andover / Bolton / Glastonbury / Hebron / Marlborough |
| Full address where sign will be posted | paragraph | no | `entry.2077122550` |
| Sign preference | choice | yes | `entry.460743996`, Picture sign / Logo sign / No preference |
| Email | **built-in email collector** | yes | posts as `emailAddress` **only if** email setting = "Responder input"; blocked if "Verified/require sign-in" |

## To build our own front-end
POST these fields to the `formResponse` URL, `target`ed at a hidden iframe (no CORS read; assume success). Confirm the email-collection mode first (see caveat). Field values for choice fields must match the option text exactly.
