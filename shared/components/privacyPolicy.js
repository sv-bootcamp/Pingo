import React, { Component, PropTypes } from 'react';
import SmallHeader from './smallHeader';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import HTMLView from 'react-native-htmlview';

const styles = {
  privacyTextStyle: {
    flex: 1,
    fontWeight: '300'
  },
  settingListBox: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#e7e7e7',
    height: 56,
    flexDirection: 'row',
    alignItems: 'center'
  },
  settingTextList: {
    color: '#2b2b2b',
    marginLeft: 16,
    fontSize: 16
  },
  settingGreyBox: {
    backgroundColor: '#e7e7e7',
    flexDirection: 'row',
    alignItems: 'center'
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

const htmlContentTerms =
  '<p/>' +
  '<h1>Terms and Conditions</h1>' +
  '<p>Last updated: December 12, 2016</p>' +
  '<p>These Terms and Conditions ("Terms", "Terms and Conditions") govern your relationship with Pingo mobile applica' +
  'tion (the "Service") operated by Pingo ("us", "we", or "our").</p>' +
  '<p>Please read these Terms and Conditions carefully before using our Pingo mobile application (the "Service").</p>' +
  '<p>Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. The' +
  'se Terms apply to all visitors, users and others who access or use the Service.</p>' +
  '<p>By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the te' +
  'rms then you may not access the Service.</p>' +
  '<p><strong>Intellectual Property</strong></p>' +
  '<p>The Service and its original content, features and functionality are and will remain the exclusive property of ' +
  'Pingo and its licensors. The Service is protected by copyright, trademark, and other laws of both the Korea, Repub' +
  'lic of and foreign countries. Our trademarks and trade dress may not be used in connection with any product or ser' +
  'vice without the prior written consent of Pingo.</p>' +
  '<p><strong>Links To Other Web Sites</strong></p>' +
  '<p>Our Service may contain links to third-party web sites or services that are not owned or controlled by Pingo.</' +
  'p>' +
  '<p>Pingo has no control over, and assumes no responsibility for, the content, privacy policies, or practices of an' +
  'y third party web sites or services. You further acknowledge and agree that Pingo shall not be responsible or liab' +
  'le, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of ' +
  'or reliance on any such content, goods or services available on or through any such web sites or services.</p>' +
  '<p>We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or se' +
  'rvices that you visit.</p>' +
  '<p><strong>Termination</strong></p>' +
  '<p>We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoev' +
  'er, including without limitation if you breach the Terms.</p>' +
  '<p>Upon termination, your right to use the Service will immediately cease.</p>' +
  '<p><strong>Limitation Of Liability</strong></p>' +
  '<p>In no event shall Pingo, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable fo' +
  'r any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of prof' +
  'its, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to ' +
  'access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtain' +
  'ed from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether bas' +
  'ed on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been infor' +
  'med of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essent' +
  'ial purpose.</p>' +
  '<p><strong>Disclaimer</strong></p>' +
  '<p>Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. T' +
  'he Service is provided without warranties of any kind, whether express or implied, including, but not limited to, ' +
  'implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance' +
  '.</p>' +
  '<p>Pingo its subsidiaries, affiliates, and its licensors do not warrant that a) the Service will function uninterr' +
  'upted, secure or available at any particular time or location; b) any errors or defects will be corrected; c) the ' +
  'Service is free of viruses or other harmful components; or d) the results of using the Service will meet your requ' +
  'irements.</p>' +
  '<p><strong>Governing Law</strong></p>' +
  '<p>These Terms shall be governed and construed in accordance with the laws of Korea, Republic of, without regard t' +
  'o its conflict of law provisions.</p>' +
  '<p>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. I' +
  'f any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of thes' +
  'e Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and s' +
  'upersede and replace any prior agreements we might have between us regarding the Service.</p>' +
  '<p><strong>Changes</strong></p>' +
  '<p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is ma' +
  'terial we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a mat' +
  'erial change will be determined at our sole discretion.</p>' +
  '<p>By continuing to access or use our Service after those revisions become effective, you agree to be bound by the' +
  'revised terms. If you do not agree to the new terms, please stop using the Service.</p>' +
  '<p><strong>Contact Us</strong></p>' +
  '<p>If you have any questions about these Terms, please contact us.</p>' +
  '<p/>';

class PrivacyPolicy extends Component {
  constructor(props) {
    super(props);
    this.renderTextPrivacyPolicy = this.renderTextPrivacyPolicy.bind(this);
    this.renderTextTerms = this.renderTextTerms.bind(this);
    this.state = {
      content: 'menu'
    };
  }

  handleButtonPrev() {
    if (this.state.content === 'privacy') {
      this.setState({content: 'menu'});
    } else {
      this.props.setCurrentScene('setting');
      Actions.pop();
    }
  }

  renderTextPrivacyPolicy() {
    return (
      <ScrollView style={{flex: 1, marginLeft: 25, marginRight: 25}}>
        <HTMLView
          value={htmlContent}
          stylesheet={styles.privacyTextStyle}
        />
      </ScrollView>
    );
  }

  renderTextTerms() {
    return (
      <ScrollView style={{flex: 1, marginLeft: 25, marginRight: 25}}>
        <HTMLView
          value={htmlContentTerms}
          stylesheet={styles.privacyTextStyle}
        />
      </ScrollView>
    );
  }

  renderSettingListBoxLeftButton(textLeft, handleButton) {
    return (
      <View style={styles.settingListBox}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={handleButton}
          >
            <Text style={[styles.settingTextList, styles.fontRobotoRegular]}>{textLeft}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderMenu() {
    return (
      <View style={{backgroundColor: '#e7e7e7', flex: 1}}>
        <View style={[styles.settingGreyBox, {height: 16}]}/>
        {this.renderSettingListBoxLeftButton('Privacy', () => this.setState({content: 'privacy'}))}
        {this.renderSettingListBoxLeftButton('Terms of Service', () => this.setState({content: 'terms'}))}
      </View>
    );
  }

  renderContent() {
    if (this.state.content === 'menu') {
      return this.renderMenu();
    } else if (this.state.content === 'privacy') {
      return this.renderTextPrivacyPolicy();
    } else if (this.state.content === 'terms') {
      return this.renderTextTerms();
    }
    return null;
  }

  render() {
    return (
      <View style={{flexDirection: 'column', flex: 1, overflow: 'hidden'}}>
        <SmallHeader
          btnRight={<View/>}
          handleBtnLeft={this.handleButtonPrev.bind(this)}
          handleBtnRight={()=>{}}
          headerText='Privacy Policy'/>
        {this.renderContent()}
      </View>
    );
  }
}

PrivacyPolicy.propTypes = {
  setCurrentScene: PropTypes.func
};

export default PrivacyPolicy;
