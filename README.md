Benefits.gov Mockup for MyGov Integration
=========================================

The is a copy of the front-end of benefits.gov for the purpose of demonstrating integration with the MyGov platform. This mockup demonstrates three things:

1. Logging in to a MyGov account with OAuth
2. Accessing the MyGov Account API for basic profile details about the user which can then be used to autofill matching form fields
3. Saving items to the Task feature in the MyGov account using the API for Tasks

An example of this can be seen at [https://apps.my.usa.gov/benefits.gov](https://apps.my.usa.gov/benefits.gov).

Understanding the Code
======================
This is a basic PHP app using the [CodeIgniter framework](http://www.codeigniter.com/). The app makes use of [Phil Sturgeon's OAuth2 Library](https://github.com/philsturgeon/codeigniter-oauth2)  with an added [provider file for MyGov](https://github.com/GSA-OCSIT/benefits-mockup/blob/master/application/libraries/Provider/Mygov.php). 

The main action takes place with two controllers: 

1. [auth.php](https://github.com/GSA-OCSIT/benefits-mockup/blob/master/application/controllers/auth.php) handles the OAuth flow 
2. [mockup.php](https://github.com/GSA-OCSIT/benefits-mockup/blob/master/application/controllers/mockup.php) assembles the mockup pages and handles the api calls for saving tasks

The URL routes are specified by application/config/routes.php and all other configuration is handled by application/config/config.php which is discussed in the section below. 

Configuration and Deployment
============================

The config file should be located at application/config/config.php. A sample file is included at application/config/config.sample.php which you should copy and rename to config.php

Configure
---------

An overview of the settings which needed to be configured in config.php

In order to interact with the MyGov platform, this app needs to be configured with a MyGov OAuth credentials (an OAuth ID, and OAuth client secret), as well as a redirect URL. These first need to be set from within the MyGov platform and then they can be set in the config file for this app. The path and URL for the app should also be set in the config as well as the URL of the MyGov server. There are actually two settings for the MyGov URL: one is for internal API calls and the other is for public links. In most cases these will be the same URL, but in the instance that you want to use HTTP auth with username and password in the URL (like for a staging server) it's best to only use the username/password for the 'mygov_server' but to take that out for the 'mygov_server_public' value. 

Deploy
---------
As a PHP app, there's nothing special needed for deployment. The files can be placed in an Apache virtual host directory just as any other PHP app would be. Other than setting up the right values in the config.php file (starting by copying config.sample.php to config.php) there shouldn't be any other setup or deployment needed. You will need to ensure that Apache is set to accept the .htaccess file (eg 'AllowOverride All') and in some cases, you may need to make adjustments to your .htaccess file depending on your environment, but in most cases the standard .htaccess file from CodeIgniter packaged here should work just fine. 


