var strResponse;
var arrLines;
var strMatchedPW;

function OktaWidget() {
    
    const oktaSignIn = new OktaSignIn({
        logo: 'https://www.okta.com/sites/default/files/media/image/2021-03/Logo_Okta_Blue_RGB.png',
        language: 'ja',
        colors: {
            brand: '#00297A'
          },
        i18n: { 
            //Overrides default text when using English. Override other languages by adding additional sections.
            'en': {
                'primaryauth.title': 'Log In',             
                'primaryauth.submit': 'Log In',            
            }
        },
        features: {
            registration: true,                           // Enable self-service registration flow
            rememberMe: false,                             // Setting to false will remove the checkbox to save username
        },
        baseUrl: "https://csm-apac.oktapreview.com",
        redirectUri: "https://192.168.1.210:4200/",
        clientId: "0oa18tefheexDDijM1d7",   //CLIENT ID GOES HERE
        authParams: {
            issuer: 'https://csm-apac.oktapreview.com/oauth2/default',
            responseType: ['token', 'id_token'],
            responseMode: 'fragment',
            display: 'page',
            scope: ['openid','email','profile']
        },
        
        registration: {
            
            parseSchema: function (schema, onSuccess, onFailure) {
                console.log(schema.profileSchema);
                onSuccess(schema);
            },
            preSubmit: function (postData, onSuccess, onFailure) {
                const myDiv = document.getElementById("console");        
                document.getElementById("console").innerHTML = " ";
                document.getElementById("console").innerHTML = "<br> <br> <h1 style=" + "'padding: 15px'>" + "CHECKING HIBP.......";
                // handle preSubmit callback
                var getEmailvalue = document.getElementsByName('email')[0].value;
                var getFirstName = document.getElementsByName('firstName')[0].value;
                var getLastName = document.getElementsByName('lastName')[0].value;
                var getPassword = document.getElementsByName('password')[0].value;

                var strValue =  SHA1(getPassword)
                var strQueryString = (strValue.substring(0, 5));
                var strCompareText = (strValue.substring(5, 999));

                var xmlHttpRequest = new XMLHttpRequest();
                xmlHttpRequest.responseType = 'text';
                xmlHttpRequest.onreadystatechange = function(){
                    if(this.readyState == 4 && this.status == 200){
                        
                        hbipres = this.responseText;
                        lines = hbipres.split("\n");
                        //document.getElementById("console").innerHTML += "<br>"
                        document.getElementById("console").innerHTML = " ";
                        for(i = 0; i < lines.length; i++){ 
                            document.getElementById("console").innerHTML += "<font color=white>" + '&nbsp' + '&nbsp' + lines[i] + "<br>"; 
                            arrLines = lines[i].split(":");
                            var StringFromHIBP = arrLines[0].toUpperCase();
                            var StringToCheck = strCompareText.toUpperCase();
                            myDiv.scrollTop = myDiv.scrollHeight;
                            if(StringToCheck==StringFromHIBP){

                                strMatchedPW = arrLines[1];
                                document.getElementById("console").innerHTML += "<font color=red>" + '&nbsp' + '&nbsp' + lines[i] + "<br>"; 
                            }
                        }
                        /////////////////////
                        ///////English///////
                        
                        //document.getElementById("console").innerHTML += '&nbsp' + '&nbsp' + "<br><br><br><br><h1 style=" + "'padding: 15px'>"  + "  Match found! The password entered has been comprimised " + "<font color=red>" + strMatchedPW +  "<font color=white>" + " times according to HIBP" + "</h1>";
                        //document.getElementById("console").innerHTML += '&nbsp' + '&nbsp' + "<br><br><br><br><h1 style=" + "'padding: 15px'>"  + "  Hashed password used to check against HIBP is " + "<font color=red>" + StringToCheck +"<font color=white>" + "</h2>";
                        ///////Japanese///////
                        document.getElementById("console").innerHTML += '&nbsp' + '&nbsp' + "<br><br><br><br><h1 style=" + "'padding: 15px'>"  + "  入力されたパスワードはHIBP上で " + "<font color=red>" + strMatchedPW +  "<font color=white>" + " 回漏洩している履歴があります。" + "</h1>";
                        document.getElementById("console").innerHTML += '&nbsp' + '&nbsp' + "<br><br><br><br><h1 style=" + "'padding: 15px'>"  + "  入力されたパスワードのハッシュ値は " + "<font color=red>" + StringToCheck +"<font color=white>" + " です。</h2>";
                        /////////////////////
                        myDiv.scrollTop = myDiv.scrollHeight;
                    }else{
                        
                    }
                }
                xmlHttpRequest.open('GET','https://api.pwnedpasswords.com/range/' + strQueryString,true);
                xmlHttpRequest.send();                    
             },
            
            postSubmit: function (response, onSuccess, onFailure) {
                // handle postsubmit callback
                onSuccess(response);
            }
            
        }
        
    });
    
    oktaSignIn.on('afterRender', function (context) {


        console.log(context.controller);
        if (context.controller == 'registration') {
            

            // Retrieve fields
            var nativElemFirstName = document.getElementsByName('firstName')[0];
            var nativElemLastName = document.getElementsByName('lastName')[0];
            var nativElemEmail = document.getElementsByName('email')[0];
            var nativElemPwd = document.getElementsByName('password')[0];
            var nativElemAcceptedPrivacyPolicy = document.getElementsByName('acceptedPrivacyPolicy')[0];

            // Retrieve the parents of the fields
            var parentsPwd = nativElemPwd.parentNode.parentNode.parentNode;
            var parentsFirstName = nativElemFirstName.parentNode.parentNode.parentNode;
            var parentsLastName = nativElemLastName.parentNode.parentNode.parentNode;
            var parentsEmail = nativElemEmail.parentNode.parentNode.parentNode;
            var parentsAcceptedPrivacyPolicy = nativElemAcceptedPrivacyPolicy.parentNode.parentNode.parentNode;

            // Hide original drop-down field
            parentsAcceptedPrivacyPolicy.style.display = "none";
            
            // Re-organise the form
            $(parentsLastName).insertAfter(parentsFirstName);
            $(parentsEmail).insertAfter(parentsLastName);
            $(parentsPwd).insertAfter(parentsEmail);
            $('subschemas-password').insertAfter(parentsPwd);
        }
    });
    
    /// Uncomment this section to handle tokens
    if (oktaSignIn.token.hasTokensInUrl()) {
        // oktaSignIn.token.parseTokensFromUrl(
        //     // If we get here, the user just logged in.
        //     function success(res) {
        //         var accessToken = res[0];
        //         var idToken = res[1];

        //         oktaSignIn.tokenManager.add('accessToken', accessToken);
        //         oktaSignIn.tokenManager.add('idToken', idToken);
        //         window.location.hash = '';
        //     },
        //     function error(err) {
        //         // console.error(err);
        //     }
        // )
    } else {

        oktaSignIn.session.get(function (res) {
            // If we get here, the user is already signed in.
            if (res.status === 'ACTIVE') {
                return;
            }

            oktaSignIn.renderEl
            (
                { el: '#okta-signin-container' },
                /// Uncomment this section to obtain token
                // function success(res) {
                //     var key = '';
                //     if (res.tokens) {
                //         oktaSignIn.authClient.tokenManager.add('accessToken', res.tokens.accessToken);
                //         oktaSignIn.authClient.tokenManager.add('idToken', res.tokens.idToken);
                //         if (res.status === 'SUCCESS') {
                //             login(res.tokens.idToken, res.tokens.accessToken);
                //         }
                //     }
                // },
                
                function error(err) {
                    console.error(err);
                }
            );

        });
    }

}

/**
* Secure Hash Algorithm (SHA1)
* http://www.webtoolkit.info/
**/
function SHA1(msg) {
    function rotate_left(n,s) {
    var t4 = ( n<<s ) | (n>>>(32-s));
    return t4;
    };
    function lsb_hex(val) {
    var str='';
    var i;
    var vh;
    var vl;
    for( i=0; i<=6; i+=2 ) {
    vh = (val>>>(i*4+4))&0x0f;
    vl = (val>>>(i*4))&0x0f;
    str += vh.toString(16) + vl.toString(16);
    }
    return str;
    };
    function cvt_hex(val) {
    var str='';
    var i;
    var v;
    for( i=7; i>=0; i-- ) {
    v = (val>>>(i*4))&0x0f;
    str += v.toString(16);
    }
    return str;
    };
    function Utf8Encode(string) {
    string = string.replace(/\r\n/g,'\n');
    var utftext = '';
    for (var n = 0; n < string.length; n++) {
    var c = string.charCodeAt(n);
    if (c < 128) {
    utftext += String.fromCharCode(c);
    }
    else if((c > 127) && (c < 2048)) {
    utftext += String.fromCharCode((c >> 6) | 192);
    utftext += String.fromCharCode((c & 63) | 128);
    }
    else {
    utftext += String.fromCharCode((c >> 12) | 224);
    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
    utftext += String.fromCharCode((c & 63) | 128);
    }
    }
    return utftext;
    };
    var blockstart;
    var i, j;
    var W = new Array(80);
    var H0 = 0x67452301;
    var H1 = 0xEFCDAB89;
    var H2 = 0x98BADCFE;
    var H3 = 0x10325476;
    var H4 = 0xC3D2E1F0;
    var A, B, C, D, E;
    var temp;
    msg = Utf8Encode(msg);
    var msg_len = msg.length;
    var word_array = new Array();
    for( i=0; i<msg_len-3; i+=4 ) {
    j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |
    msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);
    word_array.push( j );
    }
    switch( msg_len % 4 ) {
    case 0:
    i = 0x080000000;
    break;
    case 1:
    i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;
    break;
    case 2:
    i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;
    break;
    case 3:
    i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8 | 0x80;
    break;
    }
    word_array.push( i );
    while( (word_array.length % 16) != 14 ) word_array.push( 0 );
    word_array.push( msg_len>>>29 );
    word_array.push( (msg_len<<3)&0x0ffffffff );
    for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ) {
    for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];
    for( i=16; i<=79; i++ ) W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);
    A = H0;
    B = H1;
    C = H2;
    D = H3;
    E = H4;
    for( i= 0; i<=19; i++ ) {
    temp = (rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
    E = D;
    D = C;
    C = rotate_left(B,30);
    B = A;
    A = temp;
    }
    for( i=20; i<=39; i++ ) {
    temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
    E = D;
    D = C;
    C = rotate_left(B,30);
    B = A;
    A = temp;
    }
    for( i=40; i<=59; i++ ) {
    temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
    E = D;
    D = C;
    C = rotate_left(B,30);
    B = A;
    A = temp;
    }
    for( i=60; i<=79; i++ ) {
    temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
    E = D;
    D = C;
    C = rotate_left(B,30);
    B = A;
    A = temp;
    }
    H0 = (H0 + A) & 0x0ffffffff;
    H1 = (H1 + B) & 0x0ffffffff;
    H2 = (H2 + C) & 0x0ffffffff;
    H3 = (H3 + D) & 0x0ffffffff;
    H4 = (H4 + E) & 0x0ffffffff;
    }
    var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
   
    return temp.toLowerCase();
   }
   