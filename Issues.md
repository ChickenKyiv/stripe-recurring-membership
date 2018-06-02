## List of issues

Import pricing plans from Stripe

---
post profile
with running stripe update customer
It's working well, but I'll run some additional tests.
with update stripe email(if we update email address)

---
remember-me auth passport fix.
https://github.com/atherdon/repo-repo/blob/master/server/index.js#L97
https://github.com/atherdon/repo-repo/blob/master/server/middleware/passport.js#L129
Not necessary, can be feature for late stages

---
Dev, production keys
https://github.com/atherdon/repo-repo/blob/master/server/index.js#L62

---
notifications
Test a new version.
Related to Keystone CMS.
Move functionality to an appropriate place.
test with plain/HTML
implement notification sending to an actions like: purchase, forgot password


---
test forgot & reset password with token sending functionality


---
check placeholders on email address fields
- [ ] forgot
- [ ] login
- [ ] forward email
- [ ] profile

---
replace signup2 and action names
https://github.com/atherdon/repo-repo/blob/updated-routes/server/controllers/registrations-controller.js#L29
https://github.com/atherdon/repo-repo/blob/updated-routes/server/routes/registration.js#L29
- [ ] do this after testing
- [ ] and re-test it after update

---
fix pricing plans
User.getPlans()

---
Stripe elements update
https://www.producthunt.com/posts/stripe-elements-2?utm_content=buffer60ce8&utm_medium=social&utm_source=facebook.com&utm_campaign=buffer

---
Roles
https://gist.github.com/danwit/e0a7c5ad57c9ce5659d2

---
admin tasks
Get all free users and show their emails.

---
Display Search results page

---
todo
logged in page template
404 page template
before we're using a simple stuff

---
on some actions i forgot to send user to render method. caused an error
![stripe a herokuapp com update card](https://cloud.githubusercontent.com/assets/1469198/26232384/bc6de296-3c0a-11e7-96a2-501890a2d443.png)

---

Display pricing plans (updated version)
Disable and maybe get rid of previous versions with display plan info from config settings
Get pricing plans by API
Add euro sign value to amount.

---
change domain field to hidden field or to saved value on db
sign up page

---

add and test email notification
https://github.com/atherdon/repo-repo/blob/updated-routes/server/controllers/users-controller.js#L238

---
update label
(per month) (renews on May 21, 2017)
(all emails sent to [anything]@www.domain1.net are being sent there)


---
update email stuff
https://github.com/atherdon/repo-repo/commit/3db15a366c6047e252a8701dde253e532a7fe546
also remove unnecessary middleware for emails from package json

---
add mask to phone related fields

---
move to hackaton starter views
remove other unnecessary files
move all files to views root

---
admin side
Admin page. Decide to create admin side from scratch or use Forest admin integration.
Or use most popular admin sides for nodejs.

---
call method if whois checkbox is enabled

---

switch subscription plan
if you have 2 non-free plans, you want to switch from 1-to-2 or from 2-to-1 plans automatically
Cannot be done automatically without not entering card details, because stripe want to send a new token to the same user

---
express-generator update
uninstall swig email template engine

---

replace methods on stripe customer plugin with promises
https://github.com/stripe/stripe-node#using-promises

---
populate form elements, when we have failture submit
sign up and whois settings

---

add keystone cms
replace forms and add normal validation

---
mongoose promises

---
remove unnecessary methods(actions) from controllers
Some of this methods are duplicated, not deleted for stabilization, or used in previous project versions
Example: billing, profile

---
Also we need to clean up partials and views from old templates

---
transaction history
like order history page

---
Forwatd email update
- [ ] email notification - forward email was changed
- [ ] send API call to WHM 
- [ ] update data in db
- [ ] flash message

---
move some helpers(middleware) to project 
https://github.com/mjhea0/node-stripe-charge/blob/master/src/server/auth/_helpers.js

---
test forgot password
with email sending.
using namecheap email server settings.
I assume we have 2 email notifications on forgot pass func

---
dashboard - update debug information

---
email notification - change password

---
disable keystone email template helpers
cannot really used on this project stage

---
404 page template

---
replace getPlans with method, that will load plans from Stripe API dash

---
replace boot.js
with npm pacckage - consign

---
