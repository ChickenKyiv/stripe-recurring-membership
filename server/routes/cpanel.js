// cpanel.js

// cPanel API call: addon domain

// cPanel API call: create email account

// cPanel API call: default address

// cPanel API call: email forward


// https://www.namecheap.com/support/api/methods/domains/check.aspx

// Domain	Domain name for which you wish to check availability
// Available	Indicates whether the domain name is available for registration
// IsPremiumName	Indicates whether the domain name is premium
// PremiumRegistrationPrice	Registration Price for the premium domain

// https://www.namecheap.com/support/api/methods/domains/renew.aspx
// DomainName	Domain name that you are trying to renew
// DomainID	Unique integer value that represents the domain
// Renew	Indicates whether the domain was renewed successfully
// ChargedAmount	Total amount charged for the renewal
// OrderID	Unique integer value that represents the order
// TransactionID	Unique integer value that represents the transaction

// https://www.namecheap.com/support/api/methods/domains-dns/set-email-forwarding.aspx
// DomainName	String	70	Yes	Domain name to set settings
// MailBox[1..n]	String	
// No
// Yes	MailBox for which you wish to set email forwarding. For example:example@namecheap.com
// ForwardTo[1..n]	String	
// No
// Yes	Email address to forwardto.For example:example@gmail.com


// Domain	The domain name for which you are trying to set emailforwarding.
// IsSuccess	Indicates whether email forwarding were set successfully.


// https://www.namecheap.com/support/api/methods/whoisguard/enable.aspx
// WhoisguardID	Number	10	Yes	The unique WhoisGuardID which you get
// ForwardedToEmail	String	70	Yes	The email address to which WhoisGuard emails are to be forwarded

// DomainName	The domain name for which you are trying to enable WhoisGuard
// IsSuccess	Indicates whether the WhoisGuard was enabled successfully.