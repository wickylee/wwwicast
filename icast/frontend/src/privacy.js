import React from 'react';
import {
  List,
  Segment,
  Grid,
  Container,
  Header,
} from 'semantic-ui-react'

const privacy = () => (

  <Segment style={{ padding: '4em 0em' }} vertical id='features'>
    <Container>
    <Grid.Row style={{ padding: '0em 0em 2em 0em' }} >
      <Header  style={{  color:'#002556', fontSize: '2em' }} textAlign='center' as='h1'>Privacy Policy</Header>
    </Grid.Row>

    <Grid.Row  textAlign='center'>
    <List>
    <List.Item style={{ padding: '0em 0em 2em 0em' }} >

      <List.Header style={{color:'#002556'}}>We hope you read this entire Privacy Policy. However, if you’re in a hurry, here is a brief overview of the most important points:</List.Header>

      <List as='ul' style={{ padding: '2em 0em 0em 2em' }} >

      <List.Item as='li'>
      We do not and will not sell your information. We don’t help companies advertise their products to you.
      </List.Item>

      <List.Item as='li'>
      We offer a free service with limited features, but if you wish to enjoy more features offered by iCast, you can upgrade to our paid plans.
      </List.Item>

      <List.Item as='li'>      
      We use a small number of trusted third parties to help provide our products.
      </List.Item>

      <List.Item as='li'>      
      We use cookies to provide, protect, and promote our products.
      </List.Item>

      <List.Item as='li'>      
      If you have any questions or concerns about this policy, you can contact us.
      </List.Item>

      </List>

    </List.Item>

    <List.Item style={{ padding: '0em 0em 2em 0em' }} >
      
      <List.Header style={{color:'#002556', padding: '0em 0em 1em 0em' }} >What is the scope of this Privacy Policy?</List.Header>

      <List.Item as='li' style={{ padding: '0em 0em 0.5em 0em' }} >
          This Privacy Policy is incorporated into iCast’s Terms of Service and License Agreement, located at iCast.com, and applies to the information obtained by us through your use of iCast’s Site, Software, and Services (“Information”) as described in this Policy. Capitalized terms used in this Policy and not otherwise defined shall have the meanings provided for those terms in the Terms of Service.
      </List.Item>
      
    </List.Item>

    <List.Item style={{ padding: '0em 0em 2em 0em' }} >
      
      <List.Header style={{color:'#002556', padding: '0em 0em 1em 0em' }} >What is iCast’s business model?</List.Header>

      <List.Item as='li' style={{ padding: '0em 0em 0.5em 0em' }} >
      iCast offers a free service and paid plans. To enable us to continue to provide quality service to customers, we encourage the users of our free service to upgrade to one of our paid plans. We don’t help third parties to advertise their products to you. We also do not—and will not—sell your information.
      </List.Item>
      
    </List.Item>
    </List>
    </Grid.Row>

    <Grid.Row  textAlign='center'  style={{ padding: '2em 0em 2em 0em' }} >
      <Header as='h1' style={{color:'#002556'}}>Information collection and use</Header>
    </Grid.Row>

    <Grid.Row  textAlign='center'>
    <List>
    <List.Item style={{ padding: '0em 0em 2em 0em' }} >
      
      <List.Header style={{color:'#002556', padding: '0em 0em 1em 0em' }} >What Information does iCast collect about me?</List.Header>

      <List.Item as='li' style={{ padding: '0em 0em 0.5em 0em' }} >
      When you interact with our Site, Software, and/or Services, we collect information that could be used to identify you (“Personal Data”). Some of the information we collect is stored in a manner that cannot be linked back to you (“Non-Personal Data”).
      </List.Item>
     
    </List.Item>

    <List.Item style={{ padding: '0em 0em 2em 0em' }} >
      
      <List.Header style={{color:'#002556', padding: '0em 0em 1em 0em' }} >Information you provide us when you create an account</List.Header>

      <List.Item as='li' style={{ padding: '0em 0em 1em 0em' }} >
      When you sign up for or use our Services, you voluntarily give us certain Personal Data, including:
      </List.Item>

      <List as='ul' style={{ padding: '0em 0em 0em 2em' }} >

      <List.Item as='li'>
      Your username, email address, and contact and language preferences. If you log into iCast with a social networking credential, such as with your Facebook or Google account, we will ask permission to access basic information from that account, such as your name and email address. You can stop sharing that information with us at any time by removing iCast’s access to that account.
      </List.Item>

      <List.Item as='li'>
      Your payment information, if you are a paying customer. This is required to complete a commercial transaction on the Site. We use this information to enable and fulfill your transaction. If you choose to use PayPal® to finalize and pay for your order, you will provide your credit card number directly to PayPal®. The privacy policy of PayPal® will apply to the information you provide on the PayPal® website.
      </List.Item>

      </List>

      
    </List.Item>

    <List.Item style={{ padding: '0em 0em 2em 0em' }} >

      <List.Header style={{color:'#002556', padding: '0em 0em 1em 0em' }} >Other Information we collect</List.Header>
      
      <List.Item as='li' style={{ padding: '0em 0em 1em 0em' }} >
      We collect this information as you use the Site, Software, and/or Services:
      </List.Item>

      <List as='ul' style={{ padding: '0em 0em 0em 2em' }} >
        
      <List.Item as='li'>
      User Content. This consists of all text, documents, or other content or information uploaded, entered, or otherwise transmitted by you in connection with your use of the Services and/or Software.
      </List.Item>

      <List.Item as='li'>
      Names of user contacts The iCast Keyboard may request or obtain access to the names of your contacts on your device. This access helps the iCast Keyboard recognize when you are typing names so it can make appropriate suggestions (for example, if you misspell a name).
      </List.Item>

      </List>
      

    </List.Item>

    <List.Item style={{ padding: '0em 0em 2em 0em' }} >

      <List.Header style={{color:'#002556', padding: '0em 0em 1em 0em' }} >Automatically collected Information</List.Header>
      
      <List.Item as='li' style={{ padding: '0em 0em 1em 0em' }} >
      Certain data about the devices you use to connect with iCast and your use of the Site, Software, and/or Services are automatically logged in our systems, including:
      </List.Item>

      <List as='ul' style={{ padding: '0em 0em 0em 2em' }} >
        
      <List.Item as='li'>
      Location information. This is the geographic area where you use your computer and mobile devices (as indicated by an Internet Protocol (IP) address or similar identifier) when interacting with our Site, Software, and/or Services.
      </List.Item>

      <List.Item as='li'>
      Log data. As with most websites and technology services delivered over the internet, our servers automatically collect data when you access or use our Site, Software, and/or Services and record it in log files. This log data may include IP address, browser type and settings, date and time of use, information about browser configuration, language preferences, and cookie data.
      </List.Item>

      <List.Item as='li'>
      Usage information. This is information about the iCast Site, Software, and/or Services you use and how you use them. We may also obtain data from our third-party partners and service providers to analyze how users use our Site, Software, and/or Services. For example, we will know how many users access a specific page on the Site and which links they clicked on. We use this aggregated information to better understand and optimize the Site.
      </List.Item>

      <List.Item as='li'>
      Device information. This is data from your computer or mobile device, such as the type of hardware and software you are using (for example, your operating system and browser type), as well as unique device identifiers for devices that are using iCast Software.
      </List.Item>

      <List.Item as='li'>
      Cookies. Data obtained from cookies is described in the “Does iCast use cookies?” section and in our Cookie Policy.
      </List.Item>

      </List>

    </List.Item>

    <List.Item style={{ padding: '0em 0em 2em 0em' }} >

      <List.Header style={{color:'#002556', padding: '0em 0em 1em 0em' }} >Information collected from other sources</List.Header>
      
      <List.Item as='li' style={{ padding: '0em 0em 1em 0em' }} >
      We may collect information about you from third parties, such as marketing partners and researchers, where they are legally allowed to share your Information with us. We may combine the Information we receive from other sources with Information we collect from you (or your device) and use it as described in this Privacy Policy.
      </List.Item>

    </List.Item>

    <List.Item style={{ padding: '0em 0em 2em 0em' }} >
      
      <List.Header style={{color:'#002556', padding: '0em 0em 1em 0em' }} >How does iCast use my Information?</List.Header>
      
      <List.Item as='li' style={{ padding: '0em 0em 1em 0em' }} >
      We use, process, and store your Information as necessary to perform our contract with you and for our legitimate business interests, including:
      </List.Item>

      <List as='ul' style={{ padding: '0em 0em 0em 2em' }} >
      <List.Item as='li'>
      To help us provide and administer our Site, Software, and/or Services, authenticate users for security purposes, provide personalized user features and access, process transactions, conduct research, develop new features, and improve the features, algorithms, and usability of our Site, Software, and/or Services.
      </List.Item>

      <List.Item as='li'>
      To communicate with you about your use of our Site, Software, and/or Services, product announcements, and software updates, as well as respond to your requests for assistance, including providing account verification support if you’re having difficulty accessing your account.
      </List.Item>

      <List.Item as='li'>
      To send you direct marketing emails and special offers about iCast, from which you can unsubscribe at any time. For more information, 
      </List.Item>

      <List.Item as='li'>
      To display User Content associated with your account and make sure it is available to you when you use our Services.
      </List.Item>

      <List.Item as='li'>
      To provide human proofreading services for users who submit User Content in connection with this specific service.
      </List.Item>

      <List.Item as='li'>
      To calculate aggregate statistics on the number of unique devices using our Site, Software, and/or Services, and to detect and prevent fraud and misuse of those.
      </List.Item>

      </List>

    </List.Item>

    <List.Item style={{ padding: '0em 0em 2em 0em' }} >

      <List.Header style={{color:'#002556', padding: '0em 0em 1em 0em' }} >Does ICast review User Content?</List.Header>
      
      <List.Item as='li' style={{ padding: '0em 0em 1em 0em' }} >
      As a rule, iCast employees do not monitor or view your User Content stored in or transferred through our Site, Software, and/or Services, but it may be viewed if we believe the Terms of Service have been violated and confirmation is required, if we need to do so to respond to your requests for support, if we otherwise determine that we have an obligation to review it as described in the Terms of Service, or to improve our algorithms as described in the User Content section of our Terms of Service. In addition, if you request our human proofreading services, our proofreaders may also read the User Content you submit for this specific service, as necessary to perform our contract with you and for our legitimate business interests. Finally, your Information may be viewed where necessary to protect the rights, property, or personal safety of iCast and its users, or to comply with our legal obligations, such as responding to warrants, court orders, or other legal processes.
      </List.Item>

    </List.Item>
    </List>
    </Grid.Row>

    <Grid.Row  textAlign='center'  style={{ padding: '2em 0em 2em 0em' }} >
      <Header as='h1' style={{color:'#002556'}}>Information access and disclosure</Header>
    </Grid.Row>

    <Grid.Row  textAlign='center'>
    <List>
    <List.Item style={{ padding: '0em 0em 2em 0em' }} >
      
      <List.Header style={{color:'#002556', padding: '0em 0em 1em 0em' }} >Does iCast share my Information?</List.Header>

      <List.Item as='li' style={{ padding: '0em 0em 1em 0em' }} >
      We only disclose Personal Data to third parties subject to:
      </List.Item>

      <List as='ul' style={{ padding: '0em 0em 1em 2em' }} >
        
      <List.Item as='li'>
      We use service providers who assist us in meeting business operations needs, including hosting, delivering, and improving our Services. We also use service providers for specific services and functions, including email communication, customer support services, and analytics. These service providers may only access, process, or store Personal Data pursuant to our instructions and to perform their duties to us.
      </List.Item>

      <List.Item as='li'>
      We have your explicit consent to share your Personal Data.
      </List.Item>

      <List.Item as='li'>
      We believe it is necessary to investigate potential violations of the Terms of Service, to enforce those Terms of Service, or to investigate, prevent, or take action regarding illegal activities, suspected fraud, or potential threats against persons, property, or the systems on which we operate our Site, Software, and/or Services.
      </List.Item>

      <List.Item as='li'>
      We determine that the access, preservation, or disclosure of your Personal Data is required by law to protect the rights, property, or personal safety of iCast and users of our Site, Software, and/or Services, or to respond to lawful requests by public authorities, including national security or law enforcement requests.
      </List.Item>

      <List.Item as='li'>
      We need to do so in connection with a merger, acquisition, bankruptcy, reorganization, sale of some or all of our assets or stock, public offering of securities, or steps in consideration of such activities (e.g., due diligence). In these cases some or all of your Personal Data may be shared with or transferred to another entity, subject to this Privacy Policy.
      </List.Item>
      </List>

      <List.Item as='li' style={{ padding: '0em 0em 1em 0em' }} >
      We may disclose Non-Personal Data publicly and to third parties—for example, in public reports about word usage, to partners under agreement with us, or as part of progress reports we may provide to users.<br></br><br></br>
      Through the use of cookies, we help deliver advertisements for relevant iCast products and services to you.<br></br><br></br>
      Cast does not share your Personal Data with third parties for the purpose of enabling them to deliver their advertisements to you.
      </List.Item>

    </List.Item>

    <List.Item style={{ padding: '0em 0em 2em 0em' }} >

      <List.Header style={{color:'#002556', padding: '0em 0em 1em 0em' }} >Does iCast sell or rent my Personal Data?</List.Header>

      <List.Item as='li' style={{ padding: '0em 0em 0.5em 0em' }} >
      No, iCast does not sell or rent your Personal Data.
      </List.Item>

    </List.Item>

    <List.Item style={{ padding: '0em 0em 2em 0em' }} >

      <List.Header style={{color:'#002556', padding: '0em 0em 1em 0em' }} >Does iCast use cookies?</List.Header>

      <List.Item as='li' style={{ padding: '0em 0em 0.5em 0em' }} >
      Cookies are small text files stored on your device and used by web browsers to deliver personalized content and remember logins and account settings. iCast uses cookies and similar technologies, including tracking pixels and web beacons, to collect usage and analytic data that helps us provide our Site, Software, and/or Services to you, as well as to help deliver ads for relevant iCast products and services to you when you visit certain pages on the Site and then visit certain third-party sites. For more information on cookies and how iCast uses them, please see our Cookie Policy. Our products currently do not respond to Do Not Track requests.
      </List.Item>

    </List.Item>

    <List.Item style={{ padding: '0em 0em 2em 0em' }} >

      <List.Header style={{color:'#002556', padding: '0em 0em 1em 0em' }} >How do third-party apps and plugins work?</List.Header>

      <List.Item as='li' style={{ padding: '0em 0em 0.5em 0em' }} >
      Some third-party applications and services that work with us may ask for permission to access your Information. Those applications will provide you with notice and request your consent in order to obtain such access or information. Please consider your selection of such applications and services, and your permissions, carefully.<br></br><br></br>
      Some third parties’ embedded content or plugins on our Site and/or Software, such as Facebook “Like” buttons, may allow their operators to learn that you have visited the Site, and they may combine this knowledge with other data they have collected about your visits to other websites or online services that can identify you.<br></br><br></br>
      Data collected by third parties through these apps and plugins is subject to each parties’ own policies. We encourage you to read those policies and understand how other companies use your data.
      </List.Item>

    </List.Item>

    <List.Item style={{ padding: '0em 0em 2em 0em' }} >

      <List.Header style={{color:'#002556', padding: '0em 0em 1em 0em' }} >Will iCast send me emails?</List.Header>

      <List.Item as='li' style={{ padding: '0em 0em 0.5em 0em' }} >
      From time to time, we may want to contact you with information about product announcements, software updates, and special offers. We also may want to contact you with information about products and services from our business partners. You may opt out of such communications at any time by clicking the “unsubscribe” link found within iCast emails and changing your contact preferences. All iCast account holders will continue to receive transactional messages related to our Services, even if you unsubscribe from promotional emails.
      </List.Item>

    </List.Item>

    <List.Item style={{ padding: '0em 0em 2em 0em' }} >

      <List.Header style={{color:'#002556', padding: '0em 0em 1em 0em' }} >Does iCast ever make any of my Personal Data or User Content public?</List.Header>

      <List.Item as='li' style={{ padding: '0em 0em 0.5em 0em' }} >
      No, we do not share Personal Data or User Content except in the limited circumstances.
      </List.Item>

    </List.Item>
    </List>
    </Grid.Row>

    <Grid.Row  textAlign='center'  style={{ padding: '0em 0em 2em 0em' }} >
      <Header as='h1' style={{color:'#002556'}}>Data storage, transfer, retention, and deletion</Header>
    </Grid.Row>

    <Grid.Row  textAlign='center'>
    <List>
    <List.Item style={{ padding: '0em 0em 2em 0em' }} >

      <List.Header style={{color:'#002556', padding: '0em 0em 1em 0em' }} >Where is my Information stored?</List.Header>

      <List.Item as='li' style={{ padding: '0em 0em 0.5em 0em' }} >
      Information submitted to ICast will be transferred to, processed, and stored in the United States. When you use the Software on your computing device, User Content you save will be stored locally on that device and synced with our servers. If you post or transfer any Information to or through our Site, Software, and/or Services, you are agreeing to such Information, including Personal Data and User Content, being hosted and accessed in the United States.
      </List.Item>

    </List.Item>

    <List.Item style={{ padding: '0em 0em 2em 0em' }} >

      <List.Header style={{color:'#002556', padding: '0em 0em 1em 0em' }} >How secure is my Information?</List.Header>

      <List.Item as='li' style={{ padding: '0em 0em 0.5em 0em' }} >
      ICast is committed to protecting the security of your Information and takes reasonable precautions to protect it. However, internet data transmissions, whether wired or wireless, cannot be guaranteed to be 100% secure, and as a result, we cannot ensure the security of Information you transmit to us, including Personal Data and User Content; accordingly, you acknowledge that you do so at your own risk.<br></br><br></br>
      We use industry-standard encryption to protect your data in transit and at rest.<br></br><br></br>
      Once we receive your data, we protect it on our servers using a combination of technical, physical, and logical security safeguards. The security of the data stored locally in any of our Software installed on your computing device requires that you make use of the security features of your device. We recommend that you take the appropriate steps to secure all computing devices that you use in connection with our Site, Software, and Services.<br></br><br></br>
      If ICast learns of a security system breach, we may attempt to notify you and provide information on protective steps, if available, through the email address that you have provided to us or by posting a notice on the Site. Depending on where you live, you may have a legal right to receive such notices in writing.
      </List.Item>

    </List.Item>

    <List.Item style={{ padding: '0em 0em 2em 0em' }} >

      <List.Header style={{color:'#002556', padding: '0em 0em 1em 0em' }} >How can I delete my Personal Data from iCast?</List.Header>

      <List.Item as='li' style={{ padding: '0em 0em 0.5em 0em' }} >
      You can remove your Personal Data from iCast at any time by logging into your account, accessing the Settings page, and then deleting your account. Please note that, for security reasons, subscribers of our paid plans will first be instructed to cancel their subscriptions before they can delete their iCast account.
      </List.Item>

    </List.Item>

    <List.Item style={{ padding: '0em 0em 2em 0em' }} >

      <List.Header style={{color:'#002556', padding: '0em 0em 1em 0em' }} >How long is Personal Data retained?</List.Header>

      <List.Item as='li' style={{ padding: '0em 0em 0.5em 0em' }} >
      You can remove your Personal Data from iCast at any time by deleting your account as described above. However, we may keep some of your Personal Data for as long as reasonably necessary for our legitimate business interests, including fraud detection and prevention and to comply with our legal obligations including tax, legal reporting, and auditing obligations.
      </List.Item>

    </List.Item>

    <List.Item style={{ padding: '0em 0em 2em 0em' }} >

      <List.Header style={{color:'#002556', padding: '0em 0em 1em 0em' }} >What happens if iCast closes my account?</List.Header>

      <List.Item as='li' style={{ padding: '0em 0em 0.5em 0em' }} >
      If iCast closes your account due to your violation of the Terms of Service, then you may contact iCast to request deletion of your data. iCast will evaluate such requests on a case by case basis, pursuant to our legal obligations.
      </List.Item>

    </List.Item>

    <List.Item style={{ padding: '0em 0em 2em 0em' }} >

      <List.Header style={{color:'#002556', padding: '0em 0em 1em 0em' }} >Will this Privacy Policy ever change?</List.Header>

      <List.Item as='li' style={{ padding: '0em 0em 0.5em 0em' }} >
      As iCast evolves, we may need to update this Policy to keep pace with changes in our Site, Software, and Services, our business, and laws applicable to us and you. We will, however, always maintain our commitment to respect your privacy. We will notify you of any material changes that impact your rights under this Policy by email (to your most recently provided email address) or post any other revisions to this Policy, along with their effective date, in an easy-to-find area of the Site, so we recommend that you periodically check back here to stay informed of any changes. Please note that your continued use of iCast after any change means that you agree with and consent to be bound by the new Policy. If you disagree with any changes in this Policy and do not wish your information to be subject to it, you will need to delete your iCast account.
      </List.Item>

    </List.Item>
    </List>
    </Grid.Row>
  </Container>
  </Segment>
)

export default privacy