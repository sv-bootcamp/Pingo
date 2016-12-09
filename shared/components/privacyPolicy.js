import React, { Component, PropTypes } from 'react';
import SmallHeader from './smallHeader';
import {
  View,
  ScrollView
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import HTMLView from 'react-native-htmlview';

const styles = {
  privacyTextStyle: {
    flex: 1,
    fontWeight: '300',
    color: '#FF3366'
  }
};

const htmlContent =
  '<p/>' +
  '<p>Last updated: December 09, 2016</p>' +
  '<p>Pingo ("us", "we", or "our") operates the Pingo mobile application (the "Service").</p>' +
  '<p>This page informs you of our policies regarding the collection, use and disclosure of Personal Information when' +
  'you use our Service.</p>' +
  '<p>We will not use or share your information with anyone except as described in this Privacy Policy.</p>' +
  '<p>We use your Personal Information for providing and improving the Service. By using the Service, you agree to th' +
  'e collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Polic' +
  'y, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions.</p>' +
  '<p><strong>Information Collection And Use</strong></p>' +
  '<p>While using our Service, we may ask you to provide us with certain personally identifiable information that can' +
  'be used to contact or identify you. Personally identifiable information may include, but is not limited to, your e' +
  'mail address, name, other information ("Personal Information").</p>' +
  '<p><strong>Log Data</strong></p>' +
  '<p>When you access the Service by or through a mobile device, we may collect certain information automatically, in' +
  'cluding, but not limited to, the type of mobile device you use, your mobile device unique ID, the IP address of yo' +
  'ur mobile device, your mobile operating system, the type of mobile Internet browser you use and other statistics (' +
  '"Log Data").</p>' +
  '<p><strong>Location information</strong></p>' +
  '<p>We may use and store information about your location, if you give us permission to do so. We use this informati' +
  'on to provide features of our Service, to improve and customize our Service. You can enable or disable location se' +
  'rvices when you use our Service at anytime, through your mobile device settings.</p>' +
  '<p><strong>Cookies</strong></p>' +
  '<p>Cookies are files with small amount of data, which may include an anonymous unique identifier. Cookies are sent' +
  "to your browser from a web site and stored on your computer's hard drive.</p>" +
  '<p>We use "cookies" to collect information. You can instruct your browser to refuse all cookies or to indicate whe' +
  'n a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our S' +
  'ervice.</p>' +
  '<p><strong>Service Providers</strong></p>' +
  '<p>We may employ third party companies and individuals to facilitate our Service, to provide the Service on our be' +
  'half, to perform Service-related services or to assist us in analyzing how our Service is used.</p>' +
  '<p>These third parties have access to your Personal Information only to perform these tasks on our behalf and are ' +
  'obligated not to disclose or use it for any other purpose.</p>' +
  '<p><strong>Security</strong></p>' +
  '<p>The security of your Personal Information is important to us, but remember that no method of transmission over ' +
  'the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means' +
  'to protect your Personal Information, we cannot guarantee its absolute security.</p>' +
  '<p><strong>International Transfer</strong></p>' +
  '<p>Your information, including Personal Information, may be transferred to — and maintained on — computers located' +
  'outside of your state, province, country or other governmental jurisdiction where the data protection laws may dif' +
  'fer than those from your jurisdiction.</p>' +
  '<p>If you are located outside Korea, Republic of and choose to provide information to us, please note that we tran' +
  'sfer the information, including Personal Information, to Korea, Republic of and process it there.</p>' +
  '<p>Your consent to this Privacy Policy followed by your submission of such information represents your agreement t' +
  'o that transfer.</p>' +
  '<p><strong>Links To Other Sites</strong></p>' +
  '<p>Our Service may contain links to other sites that are not operated by us. If you click on a third party link, y' +
  "ou will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site " +
  'you visit.</p>' +
  '<p>We have no control over, and assume no responsibility for the content, privacy policies or practices of any thi' +
  'rd party sites or services.</p>' +
  "<p><strong>Children's Privacy</strong></p>" +
  '<p>Our Service does not address anyone under the age of 13 ("Children").</p>' +
  '<p>We do not knowingly collect personally identifiable information from children under 13. If you are a parent or ' +
  'guardian and you are aware that your Children has provided us with Personal Information, please contact us. If we ' +
  'become aware that we have collected Personal Information from a children under age 13 without verification of pare' +
  'ntal consent, we take steps to remove that information from our servers.</p>' +
  '<p><strong>Changes To This Privacy Policy</strong></p>' +
  '<p>We may update our Privacy Policy from time to time. We will notify you of any hanges by posting the new Privacy' +
  'Policy on this page.</p>' +
  '<p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are ' +
  'effective when they are posted on this page.</p>' +
  '<p><strong>Contact Us</strong></p>' +
  '<p>If you have any questions about this Privacy Policy, please contact us.</p>' +
  '<p/>';

class PrivacyPolicy extends Component {
  constructor(props) {
    super(props);
    this.renderTextPrivacyPolicy = this.renderTextPrivacyPolicy.bind(this);
  }

  handleButtonPrev() {
    this.props.setCurrentScene('setting');
    Actions.pop();
  }

  renderTextPrivacyPolicy() {
    return (
      <HTMLView
        value={htmlContent}
        stylesheet={styles.privacyTextStyle}
      />
    );
  }

  render() {
    return (
      <View style={{flexDirection: 'column', flex: 1, overflow: 'hidden'}}>
        <SmallHeader
          btnRight={<View/>}
          handleBtnLeft={this.handleButtonPrev.bind(this)}
          handleBtnRight={()=>{}}
          headerText='Privacy Policy'/>
        <ScrollView style={{flex: 1, marginLeft: 25, marginRight: 25}}>
        {this.renderTextPrivacyPolicy()}
        </ScrollView>
      </View>
    );
  }
}

PrivacyPolicy.propTypes = {
  setCurrentScene: PropTypes.func
};

export default PrivacyPolicy;
