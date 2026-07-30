# Pointing ellenforstaterep.com to the New Website

*For Trip. A short guide to switching Ellen's domain from the current Wix site to the new site when we're ready to go live. Prepared by Scott, July 26, 2026.*

## The short version

The new campaign site is already built and hosted (for free) on GitHub Pages. When everyone signs off, the only change on the domain side happens inside **Wix**: repoint a few DNS records from Wix's servers to GitHub's. Wait for it to propagate, and the domain shows the new site. Nothing has to move off Wix, the domain stays registered and managed there. Only where it points changes.

## Who does what

- **Scott / Jay (GitHub side):** finish the site, remove the preview banner, switch on the custom domain in GitHub, and turn on HTTPS.
- **Trip (Wix side):** update the domain's DNS records (the steps below). This is the only piece that needs your Wix access.
- Because this **replaces the current Wix site** at that address, we only do it once the content is final and everyone has signed off.

## The flow

```flow
Site finished and reviewed; preview banner removed (Scott / Jay)
**Trip:** update the DNS records in Wix (see steps below)
Custom domain switched on in GitHub, HTTPS enabled (Scott / Jay)
Wait for DNS to propagate and the security certificate to issue (up to 48 hours, usually much less)
ellenforstaterep.com and www show the new site, secured with HTTPS
```

## Trip's steps in Wix

In your Wix account, go to **Domains**, select **ellenforstaterep.com**, click the **Domain Actions** icon, and choose **Manage DNS Records**. (Wix's own guide: support.wix.com/en/article/connecting-a-wix-domain-to-an-external-site)

**1. Root domain, the A records (host "@")**
Delete the existing A records (they currently point to Wix, in the 185.230.63.x range) and add these four, each with host **@**:

- 185.199.108.153
- 185.199.109.153
- 185.199.110.153
- 185.199.111.153

**2. The www record (a CNAME)**
Change the existing **www** CNAME (currently `cdn1.wixdns.net`) so it points to:

- **crosseye.github.io**

Save, and that's the whole change.

## What to expect

- DNS changes can take up to **48 hours** to fully propagate, though it's often live within an hour or two.
- Once it resolves, both **ellenforstaterep.com** and **www.ellenforstaterep.com** will show the new site. GitHub automatically redirects one to the other and issues a free HTTPS certificate, so the padlock appears (the certificate can take a little while to catch up after DNS resolves).

## If something looks off

- If the site doesn't appear after a few hours, first confirm the **old Wix A records were deleted**. Leftover A records are the most common cause of a conflict.
- A "not secure" warning right after switching usually clears on its own once the certificate finishes issuing.
- It's fully reversible: restoring the original Wix A records and the `www` CNAME (`cdn1.wixdns.net`) puts the Wix site back.

## Two notes

- You do **not** need to (and cannot) change nameservers on a Wix domain. Editing the A and CNAME records is the correct method, so this is all done from within Wix.
- Nothing about registration or billing changes. The domain stays with Wix.
