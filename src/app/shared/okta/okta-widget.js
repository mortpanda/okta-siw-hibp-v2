
var signInWidgetConfig = {
  // Enable or disable widget functionality with the following options. Some of these features require additional configuration in your Okta admin settings. Detailed information can be found here: https://github.com/okta/okta-signin-widget#okta-sign-in-widget
  // Look and feel changes:
  logo: 'https://cdn.brandfolder.io/2VK5Y09C/at/5hf5mqw3gjt7k9jh9ss875b/Logo_Customer-Success_45x250.png?height=27&width=150', // Try changing "okta.com" to other domains, like: "workday.com", "splunk.com", or "delmonte.com"
  language: 'ja',                       // Try: [fr, de, es, ja, zh-CN] Full list: https://github.com/okta/okta-signin-widget#language-and-text
  i18n: {
    //Overrides default text when using English. Override other languages by adding additional sections.
    'en': {
      'primaryauth.title': 'Sign In',   // Changes the sign in text
      'primaryauth.submit': 'Sign In',  // Changes the sign in button
      // More e.g. [primaryauth.username.placeholder,  primaryauth.password.placeholder, needhelp, etc.].
      // Full list here: https://github.com/okta/okta-signin-widget/blob/master/packages/@okta/i18n/dist/properties/login.properties
    }
  },
  // Changes to widget functionality
  features: {
    registration: true,                 // Enable self-service registration flow
    rememberMe: false,                   // Setting to false will remove the checkbox to save username
    //multiOptionalFactorEnroll: true,  // Allow users to enroll in multiple optional factors before finishing the authentication flow.
    //selfServiceUnlock: true,          // Will enable unlock in addition to forgotten password
    //smsRecovery: true,                // Enable SMS-based account recovery
    //callRecovery: true,               // Enable voice call-based account recovery
    router: true,                       // Leave this set to true for the API demo
  },
  baseUrl: 'https://kent-nagao-test.oktapreview.com',
  clientId: '0oa14uubjk8PiOnrR1d7',
  redirectUri: 'https://192.168.1.210:4200/home',
  authParams: {
    issuer: 'https://kent-nagao-test.oktapreview.com/oauth2/aus14xmr8soQUuZda1d7',
    responseType: ['id_token', 'token'],
    scopes: ['openid', 'email', 'profile'],
  },
  pkce: false,
  idpDisplay: 'SECONDARY',
            idps: [{'type': 'FACEBOOK', 'id': '0oaz9oth80GL0cxz31d6'},
                    {'type': 'GOOGLE', 'id': '0oazkzuqrwpZQNl8n1d6'}],
};
signInWidget = new OktaSignIn(signInWidgetConfig);
function OktaWidget() {

    
      
      //signInWidget = new OktaSignIn(signInWidgetConfig);

      function widgetSuccessCallback(res) {
        var key = '';
        if (res[0]) {
          key = Object.keys(res[0])[0];
          signInWidget.tokenManager.add(key, res[0]);
        }
        if (res[1]) {
          key = Object.keys(res[1])[0];
          signInWidget.tokenManager.add(key, res[1]);
        }
        if (res.status === 'SUCCESS') {
          var token = signInWidget.tokenManager.get(key);
          console.log("Logged in to Okta and issued token:");
          console.log(token);
          
          //Only get the access token
          console.log(token.accessToken);
          var tokenarray = JSON.stringify(token)           
          console.log(tokenarray);
          window.location.replace('https://192.168.1.210:4200/home');
        }
      }
      
      function widgetErrorCallback (err) {
      }
      
      signInWidget.session.get(function (res) {
        // If we get here, the user is already signed in.
        if (res.status === 'ACTIVE') {
          
         // document.getElementById("messageBox").style.color = "	#FFFFFF";
         console.log("Hello, " + res.login + "! You are *still* logged in! :)");
         console.log(res.userId);
         window.location.replace("https://192.168.1.210:4200/home/"); 
          return;
        }
        signInWidget.renderEl({el: '#okta-signin-container'}, widgetSuccessCallback, widgetErrorCallback);
        signInWidget.remove();
      });
      
    }


    function RemoveLoginWidget()
    {
      signInWidget.remove();
    }
