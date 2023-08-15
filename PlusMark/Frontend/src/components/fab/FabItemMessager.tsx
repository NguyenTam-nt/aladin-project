import { FacebookIcon, PhoneSupportIcon, ZaloIcon, ZaloSupportIcon } from '@assets/icons'
import { SupportOnlineInfo } from '@services/SupportOnlineServices'
import { SUPPORT_ONLINE } from '@utility/constants'
import clsx from 'clsx'
import React, { useEffect } from 'react'

type Props = {
  data: SupportOnlineInfo
}

function FabItemMessager({data}: Props) {

  useEffect(() => {
    if(data.appName == SUPPORT_ONLINE.FACEBOOK) {
      let id = data.script
      // let id = "119339301153113"
      var chatbox = document.getElementById('fb-customer-chat');
      //@ts-ignore
      chatbox.setAttribute("page_id", id);
      //@ts-ignore
      chatbox.setAttribute("attribution", "biz_inbox");

      window.fbAsyncInit = function() {
      //@ts-ignore
        FB.init({
          xfbml: true,
          version: 'v16.0'
        });
      };

      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        // console.log(id);
        js = d.createElement(s); js.id = id;
      //@ts-ignore
        js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
      //@ts-ignore
        fjs.parentNode?.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));

      return () => {
          const fb  = document.getElementById("facebook-jssdk");
          fb?.remove();

          const fb2  = document.getElementById("fb-root");
          fb2?.remove();

          const fb3  = document.getElementById("fb-customer-chat");
          fb3?.remove();
      }
    }

  }, [])

  return (
    <div>    
        <div id="fb-root"></div>
        <div id="fb-customer-chat" className="fb-customerchat" ></div>
    </div>
  )
}

export default FabItemMessager