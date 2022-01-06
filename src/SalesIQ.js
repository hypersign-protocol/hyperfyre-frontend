// $Id$
// This code will be injected before initializing the root App
// import Vue from 'vue'

class Sales_IQ {
    constructor(props) {
      this.props = props;
    }
   
    getScript(props) {
      return `var $zoho=$zoho || {};$zoho.salesiq = $zoho.salesiq || 
      {widgetcode:"${props.widgetcode}", values:{},ready:function(){}};
      var d=document;var s=d.createElement("script");s.type="text/javascript";s.id="zsiqscript";s.defer=true;
      s.src="${
      props.domain
    }";var t=d.getElementsByTagName("script")[0];t.parentNode.insertBefore(s,t);d.write("<div id='zsiqwidget'></div>");`;
    }
  }
  
  const SalesIQ = {
    install(Vue, props = { widgetcode: '', domain: '' }) {
      let obj = new Sales_IQ(props);

      if (props.widgetcode.length === 0 || props.domain === 0) {
        throw new Error(
          `[vue-salesiq] Enter SalesIQ ${
            props.widgetcode.length === 0 ? 'Widget code' : 'domain'
          }`
        );
      }
  
      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.id = "zsiqscript";
      script.text = obj.getScript(props);
      document.body.append(script);
  
      Vue.mixin({
        mounted() {
          window.$ZSIQWidgetUI ? $ZSIQWidgetUI.handleWidgetVisible('hide') : ''; // NO I18N
        }
      });
  
      Vue.prototype.$salesiq_show = value => {
        window.$ZSIQWidgetUI.handleWidgetVisible('show'); // NO I18N
      };
  
      Vue.prototype.$salesiq_hide = () => {
        window.$ZSIQWidgetUI.handleWidgetVisible('hide'); // NO I18N
      };
    }
  };
  
  export default SalesIQ;

 