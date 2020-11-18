import React from 'react';
import {
  List,
  Segment,
  Grid,
  Container,
  Header,
} from 'semantic-ui-react'

const privacy  = () => (

  <Segment style={{ padding: '4em 0em' }} vertical id='features'>
    <Container>
    <Grid.Row style={{ padding: '0em 0em 2em 0em' }} >
      <Header style={{  color:'#002556', fontSize: '2em' }} textAlign='center' as='h1'>Terms and Conditions</Header>
    </Grid.Row>

    <Grid.Row  textAlign='center'>
    
    <Header as='h2' style={{color:'#002556'}}>Table of contents</Header>

    <List as='ul' size='big' style={{ padding: '0em 0em 3em 0em' }}>
        <List.Item as='li'>
            <a href='/terms#terms01'>Licenses</a>
        </List.Item>

        <List.Item as='li'>
            <a href='/terms#terms02'>Registration and security</a>
        </List.Item>

        <List.Item as='li'>
            <a href='/terms#terms03'>Enterprise Subscriber responsibility for Authorized Users</a>
        </List.Item>

        <List.Item as='li'>
            <a href='/terms#terms04'>Fees, payment, and trial memberships</a>
        </List.Item>

        <List.Item as='li'>
            <a href='/terms#terms05'>Termination and refund policy</a>
        </List.Item>

        <List.Item as='li'>
            <a href='/terms#terms06'>Termination of Agreement with Enterprise Subscriber</a>
        </List.Item>

        <List.Item as='li'>
            <a href='/terms#terms07'>Access to Services</a>
        </List.Item>

        <List.Item as='li'>
            <a href='/terms#terms08'>User Content</a>
        </List.Item>

        <List.Item as='li'>
            <a href='/terms#terms09'>Changes to Services or Terms</a>
        </List.Item>

        <List.Item as='li'>
            <a href='/terms#terms10'>Links to third party sites</a>
        </List.Item>

        <List.Item as='li'>
            <a href='/terms#terms11'>Consent to receive email</a>
        </List.Item>

        <List.Item as='li'>
            <a href='/terms#terms12'>Data collection and privacy</a>
        </List.Item>

        <List.Item as='li'>
            <a href='/terms#terms13'>Ownership</a>
        </List.Item>

        <List.Item as='li'>
            <a href='/terms#terms14'>Indemnity</a>
        </List.Item>

        <List.Item as='li'>
            <a href='/terms#terms15'>Warranty disclaimers</a>
        </List.Item>

        <List.Item as='li'>
            <a href='/terms#terms16'>Limitation of liability</a>
        </List.Item>

        <List.Item as='li'>
            <a href='/terms#terms17'>Dispute resolution by binding arbitration</a>
        </List.Item>

        <List.Item as='li'>
            <a href='/terms#terms18'>General provisions</a>
        </List.Item>   
   </List>
   </Grid.Row>

    <Grid.Row  textAlign='center'  style={{ padding: '4em 0em 2em 0em' }} id='terms01'>
      <Header as='h2' style={{color:'#002556'}}>Licenses</Header>
    </Grid.Row>

    <Grid.Row  textAlign='center'>
    <List>
    <List.Item>
      If you are an individual subscriber: In consideration for your acceptance of this Agreement and your payment of all applicable Fees (as defined below), iCast grants you a personal, limited, non-exclusive, non-sublicensable, non-transferable, revocable license to access and use the Site, the Services and the Software solely for your own personal purposes.
    </List.Item>

    <List.Item>
      If you are an Enterprise Subscriber: In consideration for your agreement to this Agreement and your payment of all applicable Fees (as defined below), iCast grants you a limited, non-exclusive, non-sublicensable, non-transferable, revocable license to access and make use of the Site, the Services and the Software solely for your internal business purposes. In addition, you may permit such number of Authorized Users as has been agreed between you and iCast to access and make use of the Site, Services and Software.
     </List.Item>

    <List.Item>
      If you are an Authorized User: In consideration for your agreement to this Agreement and your Enterprise Subscriber’s payment of all applicable Fees (as defined below), iCast grants you a personal, limited, non-exclusive, non-sublicensable, non-transferable, revocable license to access and make use of the Site, the Services and the Software solely for the internal business purposes of your Enterprise Subscriber.
    </List.Item>

    <List.Item>
      You may access and use the Site, Services and Software only in accordance with any instruction manuals, user guides and other documentation as made available by iCast from time to time (“Documentation”).
    </List.Item>

    <List.Item>
      If you are an Enterprise Subscriber, this restriction applies to each of your Authorized Users individually, not to your overall use of the Site, Services and Software.
    </List.Item>

    <List.Item>
      In addition, you may not:
    </List.Item>
    </List>

    <List as='ol'>
    <List.Item as='li'>
      copy, modify or create derivative works based on the Site, Services, Software or Documentation, or any portion(s) of any of the foregoing (individually and collectively, “ICast IP”);
    </List.Item>

    <List.Item as='li'>
      distribute, transmit, publish or otherwise disseminate any iCast IP;
    </List.Item>

    <List.Item as='li'>
      download or store any iCast IP except to the extent explicitly permitted on the Site;
    </List.Item>

    <List.Item as='li'>
    transfer to any third party any of your rights under this Agreement (except to the extent that an Enterprise Subscriber may permit such number of Authorized Users as has been agreed between the Enterprise Subscriber and iCast to access and make use of the Site, Services and Software);
    </List.Item>

    <List.Item as='li'>
    access or use the Services, Software or iCast IP for the benefit of any third party (except to the extent that Authorized Users may access and make use of the Site, the Services and the Software solely for the internal business purposes of their Enterprise Subscriber);
    </List.Item>  


    <List.Item as='li'>
    access content or data not intended for you, log onto a server or account that you are not authorized to access, or otherwise violate or attempt to violate any security or authentication feature or measures of the Site, Software or Services;
    </List.Item> 

    <List.Item as='li'>
    attempt to access or derive the source code or architecture of any Software;
    </List.Item>

    <List.Item as='li'>
    attempt to probe, scan or test the vulnerability of the Site, Services and/or Software, or any associated system or network, or to breach any security or authentication feature or measures of the Site, Software or Services (except with iCast’s express permission in connection with your participation in one of iCast’s security testing programs), and if you are blocked by iCast from accessing the Site, Software or Services (including by blocking your IP address), you will not implement any measures to circumvent such blocking (e.g., by masking your IP address or using a proxy IP address);
    </List.Item>

    <List.Item as='li'>
    interfere or attempt to interfere with service to any user, host or network, including, without limitation, by means of submitting malicious software or computer code (“Malicious Code”) to the Site or Services, load testing, overloading, “flooding,” “spamming,” “mail bombing,” “crashing,”;
    </List.Item>

    <List.Item as='li'>
    email or otherwise transmit any content that (i) infringes any intellectual property or other proprietary rights of any party; (ii) you do not have a right to upload under any law or under contractual or fiduciary relationships; (iii) contains any Malicious Code, files or programs designed to interrupt, destroy or limit the functionality of any computer software or hardware or telecommunications equipment; (iv) poses or creates a privacy or security risk to any person or entity; (v) constitutes unsolicited or unauthorized materials; or (vi) is otherwise objectionable;
    </List.Item>

    <List.Item as='li'>
    automate access to the Site or the Services, including, without limitation, through the use of APIs, bots, scrapers or other similar devices;
    </List.Item>

    <List.Item as='li'>
    export or re-export any iCast IP;
    </List.Item>

    <List.Item as='li'>
    use or access any Services, Software or iCast IP in order to build a competitive product, service or solution;
    </List.Item>

    <List.Item as='li'>
    violate any applicable law or regulations in connection with your use of the Site, Services or Software;
    </List.Item>

    <List.Item as='li'>
    impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity, including, without limitation, an Enterprise Subscriber; or
    </List.Item>

    <List.Item as='li'>
    permit any third party to do any of the foregoing.
    </List.Item>
    </List>

    <List.Item id='terms02'>
    iCast may offer certain Software, including certain interfaces, for download from the Site (“Ancillary Software”). Subject to the other terms and conditions of this Agreement, you may install and use Ancillary Software on computers owned, leased or otherwise controlled by you, solely in conjunction with your authorized use of the Services. Upon expiration or termination of this Agreement for any reason, you shall cease any further use of the Ancillary Software and shall promptly destroy all copies thereof in your possession.<br></br><br></br>
    Certain Services or Software (including Ancillary Software) may be subject to additional limitations, restrictions, terms and/or conditions specific to such Services or Software (“Specific Terms”). In such cases, the applicable Specific Terms will be made available to you and your access to and use of the relevant Services or Software will be contingent upon your acceptance of and compliance with such Specific Terms.<br></br><br></br>
    Certain Services or Software (including Ancillary Software) may contain or otherwise make use of software, code or related materials from third parties, including “open source” or “freeware” software (“Third Party Components”). Certain Third Party Components may be subject to separate license terms that accompany such Third Party Components that, to the extent they conflict with the terms of this Agreement, supersede the terms of this Agreement. If required by any license for a particular Third Party Component, iCast makes the source code of such Third Party Component, and any of iCast’s modifications to such Third Party Component, as required, available upon written request to iCast.
    </List.Item>
    
    </Grid.Row>

    <Grid.Row  textAlign='center'  style={{ padding: '4em 0em 2em 0em' }}>
      <Header as='h2' style={{color:'#002556'}}>Registration and security</Header>
    </Grid.Row>

    <Grid.Row  textAlign='center'>
    <List>
    <List.Item id='terms03'>
    By completing the registration process for any given Services, you are agreeing to subscribe to the selected Services, subject to the terms and conditions of this Agreement. You agree to provide iCast with accurate and complete registration information and to promptly notify iCast in the event of any changes to any such information.<br></br><br></br>
    You shall be solely responsible for the security and proper use of all user IDs, passwords or other security devices used in connection with the Site and/or the Services, and shall take all reasonable steps to ensure that they are kept confidential and secure, are used properly and are not disclosed to or used by any other person or entity. You shall immediately inform iCast if there is any reason to believe that a user ID, password or any other security device issued by iCast has or is likely to become known to someone not authorized to use it, or is being or is likely to be used in an unauthorized way. iCast reserves the right (at its sole discretion) to request that you change your password(s) in connection with the Services, and you shall promptly comply with any such request.<br></br><br></br>
    You are solely responsible for all activity in connection with access to the Site and/or Services through your account or using your password, and for the security of your computer systems, and in no event shall iCast be liable for any loss or damages relating to such activity.
    </List.Item>
    </List>  
    </Grid.Row>

    <Grid.Row  textAlign='center'  style={{ padding: '4em 0em 2em 0em' }}>
      <Header as='h2' style={{color:'#002556'}}>Enterprise Subscriber responsibility for Authorized Users</Header>
    </Grid.Row>

    <Grid.Row  textAlign='center'>
    <List>
    <List.Item id='terms04'>
    Enterprise Subscribers shall ensure that the total number of Authorized Users, but Authorized Users may not transfer (including by way of sublicense, lease, assignment or other transfer, including by operation of law) their seat, user name or right to use the Site, Services or Software to any third party. You, the Enterprise Subscriber, and your Authorized Users are jointly responsible for your Authorized Users’ use of the Site, Services and Software. You are also responsible for ensuring that all of your Authorized Users comply with all of the terms and conditions of this Agreement. Any violation of the terms and/or conditions of this Agreement by any of your Authorized Users shall be deemed to be a violation thereof by you.
    </List.Item>
    </List>  
    </Grid.Row>

    <Grid.Row  textAlign='center'  style={{ padding: '4em 0em 2em 0em' }}>
      <Header as='h2' style={{color:'#002556'}}>Fees, payment, and trial memberships</Header>
    </Grid.Row>

    <Grid.Row  textAlign='center'>
    <List>
    <List.Item id='terms05'>
    If you have registered to use certain Services and/or Software on a trial basis, then you may use such Services and Software only for noncommercial evaluation purposes during the applicable trial period. Your access to or use of the Services and/or Software shall be contingent upon your payment of all applicable fees as described on the Site or Software at the time (“Fees”); unless you are an Authorized User, in which case your access to or use of the Services and/or Software shall be contingent upon your Enterprise Subscriber’s payment of the Fees.<br></br><br></br>
    Upon registering for Services, unless you are an Authorized User, you will be required to designate a valid payment method. You hereby authorize iCast to charge to your designated account all Fees relating to the Services you select, and you agree to pay all such Fees in accordance with the applicable payment method terms and conditions.<br></br><br></br>
    iCast reserves the right to revise its Fees, including by increasing or adding new Fees, at any time on thirty (30) days’ notice. Such notice may be sent to you by email to your most recently provided email address or posted on the Site or by any other manner chosen by iCast in its commercially reasonable discretion. You will be deemed to have received any such notice that is posted on the Site on the day it was posted. Your use of the Services after the ten (30) day notice period constitutes your acceptance of the new or revised Fees. If you do not agree to the revised Fees, you may cancel your subscription by following the “View cancellation instructions” link below.<br></br><br></br>
    <i>Continuous membership</i><br></br><br></br>
    To ensure uninterrupted service, all subscriptions to the Site, Software and Services are renewed automatically. You hereby authorize iCast to charge subscription Fees for the renewal period to the payment method on file. All subscriptions are renewed at the subscription level(s) and Fees in effect at the time the then-current subscription term ends. You may cancel the subscription at any time by following the “View cancellation instructions” link below.<br></br><br></br>
    <i>Free trial</i><br></br><br></br>
    iCast may offer a free trial membership from time to time with regard to certain Software or Services (a “Trial”). By accessing or using the Site, Services or Software, you agree to the terms of any such Trial and further agree to any changes iCast may make to such Trial as described in “Changes to Services or Terms” below. If you cancel the Services before the end of the trial period, all your rights to any remaining free trial period will be waived.
    </List.Item>
    </List>  
    </Grid.Row>


    <Grid.Row  textAlign='center'  style={{ padding: '4em 0em 2em 0em' }}>
      <Header as='h2' style={{color:'#002556'}}>Termination and refund policy</Header>
    </Grid.Row>

    <Grid.Row  textAlign='center'>
    <List>
    <List.Item id='terms06'>
    This Agreement shall continue until you cancel your subscription or until terminated by iCast. You may cancel your subscription at any time, although only an authorized representative of an Enterprise Subscriber may cancel the Enterprise Subscriber’s account. If you cancel after your subscription renewal date, you will not receive a refund for any amounts that have been charged. Your cancellation will be effective at the end of your then-current subscription period, subject to applicable law, and you may use the Services until your cancellation is effective (unless your access is suspended or terminated as set forth below).<br></br><br></br>
    iCast may deny you access to all or any part of the Services or terminate your account with or without prior notice if you engage in any conduct or activities that iCast determines, in its sole discretion, violate this Agreement or the rights of iCast or any third party, or is otherwise inappropriate. Without limitation, iCast may deny you access to the Services, or terminate this Agreement and your account, if your use of the Services exceeds the 21-day limitations set forth under the section titled “License.”<br></br><br></br>
    If you are an Authorized User of an Enterprise Subscriber, your Enterprise Subscriber may elect in its discretion and at any time to revoke your Authorized User status and (a) terminate your account or (b) downgrade your account to an individual subscriber account, at which point you agree that your use of the Services and Software will be as an individual subscriber in accordance with the terms of this Agreement (which Agreement at that point will be solely between you and iCast).<br></br><br></br>
    Upon termination of your account(s) for any reason, your right to use the Services and Software and to access the Site and any of its content will immediately cease and all content in your account(s) will be deleted. All provisions of this Agreement that by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, limitations of liability and miscellaneous provisions.<br></br><br></br>
    Except as may be expressly set forth herein, all Fees paid or accrued in connection with any Services are non-refundable, and iCast will not prorate any Fees paid for a subscription that is terminated before the end of its term.
    </List.Item>
    </List>  
    </Grid.Row>



    <Grid.Row  textAlign='center'  style={{ padding: '4em 0em 2em 0em' }}>
      <Header as='h2' style={{color:'#002556'}}>Termination of Agreement with Enterprise Subscriber</Header>
    </Grid.Row>

    <Grid.Row  textAlign='center'>
    <List>
    <List.Item id='terms07'>
    This section titled “Termination of Agreement with Enterprise Subscriber” applies only to Enterprise Subscribers.<br></br><br></br>
    Either iCast or you may terminate this Agreement by notice if the other party breaches any material term of this Agreement and fails to cure such breach within thirty (30) days after receipt of notice of the breach from the non-defaulting party. In addition, iCast may suspend the Services upon notice if you fail to make any payment when due and fail to cure such breach within ten (10) days after receipt of notice of the breach from iCast. Any such suspension or termination shall be without limitation of any other right or remedy available to the terminating party.<br></br><br></br>
    iCast may terminate this Agreement for convenience upon sixty (60) days’ prior written notice without liability to you. Following a termination pursuant to the foregoing sentence, iCast shall refund the pro rata portion of any Fees relating to the remaining term, as applicable.<br></br><br></br>
    Either iCast or you may terminate this Agreement immediately upon notice to the other party if the other party has a receiver or similar party appointed for all or substantially all of its property, is declared insolvent by a court of competent jurisdiction, ceases to do business in the ordinary course, files a petition in bankruptcy or has a petition filed against it in bankruptcy, becomes the subject of any court or administrative proceeding related to its liquidation or insolvency (whether voluntary or involuntary) that is not dismissed within ninety (90) days, or makes an assignment for the benefit of its creditors.<br></br><br></br>
    If this Agreement is terminated or otherwise expires for any reason, you shall promptly return to iCast or destroy, as directed by iCast, all Confidential Information, Software and other materials in your possession or under your control belonging to iCast, and all rights and licenses granted by iCast pursuant to this Agreement shall terminate. Upon the expiration or termination of this Agreement, your right to use the Services and Software and to access the Site and any of its content will immediately cease and iCast may elect in its discretion to (a) terminate your Authorized Users’ accounts or (b) downgrade your Authorized Users’ accounts to individual subscriber accounts.<br></br><br></br>
    All provisions of this Agreement that by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, limitations of liability and miscellaneous provisions.
    </List.Item>
    </List>  
    </Grid.Row>




    <Grid.Row  textAlign='center'  style={{ padding: '4em 0em 2em 0em' }}>
      <Header as='h2' style={{color:'#002556'}}>Access to Services</Header>
    </Grid.Row>

    <Grid.Row  textAlign='center' id='terms08'>
    <List>
    <List.Item>
    You are responsible for obtaining and maintaining any equipment and ancillary services needed to connect to or access the Site or otherwise use the Services, including, without limitation, modems, hardware, software, internet service and telecommunications capacity. You shall be solely responsible for ensuring that such equipment and ancillary services are compatible with the Services and Software.
    </List.Item>
    </List>  
    </Grid.Row>



    <Grid.Row  textAlign='center'  style={{ padding: '4em 0em 2em 0em' }}>
      <Header as='h2' style={{color:'#002556'}}>User Content</Header>
    </Grid.Row>

    <Grid.Row  textAlign='center'>
    <List>
    <List.Item id='terms09'>
    You are solely responsible for all text, documents or other content or information uploaded, entered or otherwise transmitted by you in connection with your use of the Services and/or Software (“User Content”). User Content includes, among other things, any mistakes contained in the content or information transmitted by you. iCast has no obligation to monitor any User Content and shall have no liability to you or any other person or entity with respect thereto, including, without limitation, liability with respect to any information (including your confidential information) contained in or apparent from any User Content. You warrant, represent and covenant that you own or have a valid and enforceable license to use all User Content, and that no User Content infringes, misappropriates or violates the rights (including, without limitation, any copyrights or other intellectual property rights) of any person or entity or any applicable law, rule or regulation of any government authority of competent jurisdiction. iCast is not responsible for the loss, corruption or other changes to User Content. Without limiting the foregoing, any feature(s) of the Services and/or Software that may permit you to temporarily save or otherwise store User Content is offered for your convenience only and iCast does not guarantee that the User Content will be retrievable. You are solely responsible for saving, storing and otherwise maintaining User Content including by maintaining backup copies of your User Content on appropriate independent systems that do not rely on the Services and/or Software.<br></br><br></br>
    You retain all right, title, and interest in and to your User Content. By uploading or entering any User Content, you give iCast (and those it works with) a nonexclusive, worldwide, royalty-free and fully-paid, transferable and sublicensable, perpetual, and irrevocable license to copy, store and use your User Content (and, if you are an Authorized User, your Enterprise Subscriber’s User Content) in connection with the provision of the Software and the Services and to improve the algorithms underlying the Software and the Services.
    </List.Item>
    </List>  
    </Grid.Row>



    <Grid.Row  textAlign='center'  style={{ padding: '4em 0em 2em 0em' }}>
      <Header as='h2' style={{color:'#002556'}}>Changes to Services or Terms</Header>
    </Grid.Row>

    <Grid.Row  textAlign='center'>
    <List>
    <List.Item id='terms10'>
    iCast reserves the right at any time to (i) change any information, specifications, features or functions of the Site, Services or Software, including any Trial, (ii) suspend or discontinue, temporarily or permanently, any or all of the Services or any Trial, including the availability of any feature, database or content, or (iii) impose limits on certain features and Services or restrict access to parts or all of the Services, including any Trial, in each case with or without prior notice and without any liability to you or any third party. iCast will use its commercially reasonable efforts to notify you of changes to the Services and/or Software that, in iCast’s reasonable opinion, have the effect of materially and adversely diminishing the functionality of the Services to which you have subscribed.<br></br><br></br>
    iCast may from time to time update or revise this Agreement. If iCast updates or revises this Agreement, iCast will notify you either by email to your most recently provided email address, by posting the updated or revised Terms of Service and End User License Agreement on the Site or by any other manner chosen by iCast in its commercially reasonable discretion. Your use of the Site, Services or Software following any such update or revision constitutes your agreement to be bound by and comply with this Agreement as updated or revised. You can view the most current Terms of Service and End User License Agreement at iCast.com/terms. It is your responsibility to review the Terms of Service and End User License Agreement periodically.<br></br><br></br>
    If you cancel your subscription within ten (10) days following such notice by iCast in accordance with the two preceding paragraphs, then iCast will refund you a pro-rated portion of any pre-paid Fees for the affected Services applicable to the cancelled portion of the pre-paid subscription term, if any.
    </List.Item>
    </List>  
    </Grid.Row>



    <Grid.Row  textAlign='center'  style={{ padding: '4em 0em 2em 0em' }}>
      <Header as='h2' style={{color:'#002556'}}>Links to third party sites</Header>
    </Grid.Row>

    <Grid.Row  textAlign='center'>
    <List>
    <List.Item id='terms11'>
    Any links on the Site to third party websites are provided for your convenience only. If you choose to access third party websites or obtain products or services from third parties, you do so entirely at your own risk and such access is between you and such third party. iCast does not warrant or make any representation regarding the legality, accuracy or authenticity of content presented by such websites or any products or services offered by third parties and shall have no liability for any loss or damages arising from the access or use of such websites, products or services.
    </List.Item>
    </List>  
    </Grid.Row>



    <Grid.Row  textAlign='center'  style={{ padding: '4em 0em 2em 0em' }}>
      <Header as='h2' style={{color:'#002556'}}>Consent to receive email</Header>
    </Grid.Row>

    <Grid.Row  textAlign='center'>
    <List>
    <List.Item id='terms12'>
    Your registration to use the Site and/or Services constitutes your consent to receive email communications from iCast, including messages regarding customer service issues and other matters. You may opt not to receive email correspondence, other than technical notifications and email regarding issues related to your account and your use of the Site and Services, at any time by following the link included in the email messages.
    </List.Item>
    </List>  
    </Grid.Row>



    <Grid.Row  textAlign='center'  style={{ padding: '4em 0em 2em 0em' }}>
      <Header as='h2' style={{color:'#002556'}}>Data collection and privacy</Header>
    </Grid.Row>

    <Grid.Row  textAlign='center'>
    <List>
    <List.Item id='terms13'>
    iCast does not collect personally identifiable information from you except to the extent you have explicitly given such information to iCast. iCast’s information practices are further described in its privacy policy, which is available at: iCast.com/privacy-policy (the “Privacy Policy”). The Privacy Policy is an integral part of this Agreement and is expressly incorporated by reference, and by entering into this Agreement you agree to (i) all of the terms of the Privacy Policy, and (ii) iCast’s use of data as described in the Privacy Policy is not an actionable breach of your privacy or publicity rights.<br></br><br></br>
    iCast may from time to time update or revise the Privacy Policy. If iCast updates or revises the Privacy Policy, iCast will notify you either by email to your most recently provided email address, by posting the updated or revised Privacy Policy on the Site or by any other manner chosen by iCast in its commercially reasonable discretion. Your use of the Site, Services or Software following any such update or revision constitutes your agreement to be bound by and comply with the Privacy Policy as updated or revised.<br></br><br></br>
    In addition, iCast may engage third parties to conduct risk control and fraud detection/prevention activities. As part of such engagements, if you initiate a transaction on the Site or through the Services, iCast may give such third parties access to your pertinent credit card and other personal information. Such third parties may only use such personal information for purposes of performing risk control and fraud detection/prevention activities for us. However, they may also convert such personal information into hashed or encoded representations of such information to be used for statistical and/or fraud prevention purposes. By initiating any such transaction, you hereby consent to the foregoing disclosure and use of your information.
    </List.Item>
    </List>  
    </Grid.Row>



    <Grid.Row  textAlign='center'  style={{ padding: '4em 0em 2em 0em' }}>
      <Header as='h2' style={{color:'#002556'}}>Ownership</Header>
    </Grid.Row>

    <Grid.Row  textAlign='center'>
    <List>
    <List.Item id='terms14'>
    All intellectual property rights in and to the User Content are and shall remain your property, and iCast shall acquire no right of ownership with respect to your User Content.<br></br><br></br>
    All intellectual property rights in and to the Software, Site and Services and other iCast IP are and shall remain the sole property of iCast and its affiliates and licensors, as applicable, and you shall acquire no right of ownership or use with respect to any Software or other iCast IP except as specified in this Agreement. Without limiting the foregoing, you acknowledge that the Software and the Service and the inventions, know-how and methodology embodied therein are proprietary to, and contain valuable trade secrets of, iCast and its affiliates and licensors, as applicable, and that the Software constitutes Confidential Information of iCast. You may from time to time provide iCast with suggestions, comments, recommendations, improvements, solutions, bug fixes, features, concepts, techniques, ideas, know-how and/or any feedback regarding the Services, the Software, the Site and/or any of iCast’s related technologies (“Feedback”). Any and all Feedback is and shall be given entirely voluntarily. As between the you, iCast and, if applicable, your Enterprise Subscriber, all Feedback shall be exclusively owned by iCast, and you hereby make all assignments necessary to accomplish the foregoing ownership, and as a result iCast shall be freely entitled to reproduce, prepare derivative works, disclose to third parties, display and perform (publicly or otherwise), sell, lease, license, distribute and otherwise use and exploit any and all such Feedback as it deems appropriate, at its sole discretion, without obligation or liability of any kind to you, your Enterprise Subscriber (if applicable) or any other person or entity.
    </List.Item>
    </List>  
    </Grid.Row>



    <Grid.Row  textAlign='center'  style={{ padding: '4em 0em 2em 0em' }}>
      <Header as='h2' style={{color:'#002556'}}>Indemnity</Header>
    </Grid.Row>

    <Grid.Row  textAlign='center'>
    <List>
    <List.Item id='terms15'>
    You shall indemnify, release and hold harmless iCast and its parents, subsidiaries, affiliates, licensors and suppliers, and each of their respective officers, directors, employees and agents, from and against any loss, liability (including settlements, judgments, fines and penalties) and costs (including reasonable attorney fees, court costs and other litigation expenses) relating to any claim or demand made by any third party due to or arising out of your access to the Site, use of the Services or Software, violation of this Agreement, or infringement of any intellectual property or other right of any person or entity.
    </List.Item>
    </List>  
    </Grid.Row>



    <Grid.Row  textAlign='center'  style={{ padding: '4em 0em 2em 0em' }}>
      <Header as='h2' style={{color:'#002556'}}>Warranty disclaimers</Header>
    </Grid.Row>

    <Grid.Row  textAlign='center'>
    <List>
    <List.Item id='terms16'>
    TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, iCAST, ITS LICENSORS AND ITS SUPPLIERS EXPRESSLY DISCLAIM ANY AND ALL WARRANTIES AND CONDITIONS, EXPRESS OR IMPLIED, REGARDING THE SITE, SERVICES, AND SOFTWARE, INCLUDING, BUT NOT LIMITED TO, ANY IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, MERCHANTABLE QUALITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NONINFRINGEMENT, SATISFACTORY QUALITY OR ARISING FROM A COURSE OF DEALING, LAW, USAGE, OR TRADE PRACTICE, OR REGARDING SECURITY, QUIET ENJOYMENT, RELIABILITY, TIMELINESS AND PERFORMANCE. YOU AGREE THAT YOUR USE OF THE SITE, SERVICES AND SOFTWARE ARE AT YOUR OWN SOLE RISK AND THAT THE SITE, SERVICES AND ANY SOFTWARE ARE PROVIDED ON AN “AS IS,” “WHERE IS,” “AS AVAILABLE,” “WITH ALL FAULTS” BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WITHOUT LIMITING THE FOREGOING, iCAST AND ITS LICENSORS AND ITS SUPPLIERS DO NOT WARRANT THAT THE OPERATION OF THE SITE, SERVICES AND/OR SOFTWARE WILL MEET YOUR REQUIREMENTS OR WILL BE UNINTERRUPTED OR ERROR-FREE.
    </List.Item>
    </List>  
    </Grid.Row>



    <Grid.Row  textAlign='center'  style={{ padding: '4em 0em 2em 0em' }}>
      <Header as='h2' style={{color:'#002556'}}>Limitation of liability</Header>
    </Grid.Row>

    <Grid.Row  textAlign='center'>
    <List>
    <List.Item id='terms17'>
    IN NO EVENT SHALL iCAST BE LIABLE WITH RESPECT TO THE SITE, SERVICES AND/ OR SOFTWARE FOR (I) ANY AMOUNT IN THE AGGREGATE IN EXCESS OF THE FEES YOU HAVE ACTUALLY PAID TO iCAST DURING THE TWELVE (12) MONTH PERIOD IMMEDIATELY PRECEDING THE EVENT(S) GIVING RISE TO SUCH LIABILITY; (II) ANY LOST PROFITS, LOST OR DAMAGED USER CONTENT OR OTHER DATA, OR FAILURE TO MEET ANY DUTY, INCLUDING WITHOUT LIMITATION GOOD FAITH AND REASONABLE CARE; OR (III) ANY INDIRECT, INCIDENTAL, PUNITIVE, SPECIAL, EXEMPLARY OR CONSEQUENTIAL DAMAGES OF ANY KIND WHATSOEVER.<br></br><br></br>
    YOU AGREE THAT THIS LIMITATION OF LIABILITY REPRESENTS A REASONABLE ALLOCATION OF RISK AND IS A FUNDAMENTAL ELEMENT OF THE BASIS OF THE BARGAIN BETWEEN ICAST AND YOU. YOU UNDERSTAND THAT THE SITE, SERVICES AND SOFTWARE WOULD NOT BE PROVIDED WITHOUT SUCH LIMITATIONS.
    </List.Item>
    </List>  
    </Grid.Row>



    <Grid.Row  textAlign='center'  style={{ padding: '4em 0em 2em 0em' }}>
      <Header as='h2' style={{color:'#002556'}}>Dispute resolution by binding arbitration</Header>
    </Grid.Row>

    <Grid.Row  textAlign='center'>
    <List>
    <List.Item>
    PLEASE READ THIS SECTION CAREFULLY AS IT AFFECTS YOUR RIGHTS.
    </List.Item>
    </List>

    <List as='ol'>        
    <List.Item as='li'>Agreement to Arbitrate<br></br><br></br>
    This Section titled “Dispute resolution by binding arbitration” is referred to in this Agreement as the “Arbitration Agreement.” You agree that any and all disputes or claims that have arisen or may arise between you and iCast, whether arising out of or relating to this Agreement (including any alleged breach thereof), the Site, Software or Services, any advertising or any aspect of the relationship or transactions between us, shall be resolved exclusively through final and binding arbitration, rather than a court, in accordance with the terms of this Arbitration Agreement, except that you may assert individual claims in small claims court, if your claims qualify. Further, this Arbitration Agreement does not preclude you from bringing issues to the attention of federal, state, or local agencies, and such agencies can, if the law allows, seek relief against us on your behalf. You agree that, by entering into this Agreement, you and iCast are each waiving the right to a trial by jury or to participate in a class action. Your rights will be determined by a neutral arbitrator, not a judge or jury.<br></br><br></br>
    </List.Item>

    <List.Item as='li'>Prohibition of Class and Representative Actions and Non-Individualized Relief<br></br><br></br>
    YOU AND iCAST AGREE THAT EACH OF US MAY BRING CLAIMS AGAINST THE OTHER ONLY ON AN INDIVIDUAL BASIS AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE ACTION OR PROCEEDING. UNLESS BOTH YOU AND iCAST AGREE OTHERWISE, THE ARBITRATOR MAY NOT CONSOLIDATE OR JOIN MORE THAN ONE PERSON’S OR PARTY’S CLAIMS AND MAY NOT OTHERWISE PRESIDE OVER ANY FORM OF A CONSOLIDATED, REPRESENTATIVE, OR CLASS PROCEEDING. ALSO, THE ARBITRATOR MAY AWARD RELIEF (INCLUDING MONETARY, INJUNCTIVE, AND DECLARATORY RELIEF) ONLY IN FAVOR OF THE INDIVIDUAL PARTY SEEKING RELIEF AND ONLY TO THE EXTENT NECESSARY TO PROVIDE RELIEF NECESSITATED BY THAT PARTY’S INDIVIDUAL CLAIM(S).<br></br><br></br>
    </List.Item>

    <List.Item as='li'>Pre-Arbitration Dispute Resolution<br></br><br></br>
    iCast is always interested in resolving disputes amicably and efficiently, and most customer concerns can be resolved quickly and to the customer’s satisfaction by emailing customer support at support@iCast.com. If such efforts prove unsuccessful, a party who intends to seek arbitration must first send to the other, by certified mail, a written Notice of Dispute (“Notice”). The Notice to iCast should be sent to Unit 510, Hoi Luen Industrial Centre, Bock B, 55 Hou Yuen Road, Kwun Tong, Kowloon, Hong Kong, Attn: Operations Department (“Notice Address”). The Notice must (i) describe the nature and basis of the claim or dispute and (ii) set forth the specific relief sought. If iCast and you do not resolve the claim within sixty (60) calendar days after the Notice is received, you or iCast may commence an arbitration proceeding. During the arbitration, the amount of any settlement offer made by iCast or you shall not be disclosed to the arbitrator until after the arbitrator determines the amount, if any, to which you or iCast is entitled.<br></br><br></br>
    </List.Item>

    <List.Item as='li'>Confidentiality<br></br><br></br>
    All aspects of the arbitration proceeding, and any ruling, decision, or award by the arbitrator, will be strictly confidential for the benefit of all parties.<br></br><br></br>
    </List.Item>

    <List.Item as='li'>Severability<br></br><br></br>
    Without limiting the severability provision in the Section titled “General Provisions” of this Agreement, if a court or the arbitrator decides that any term or provision of this Arbitration Agreement other than clause (b) of this Arbitration Agreement is invalid or unenforceable, the parties agree to replace such term or provision with a term or provision that is valid and enforceable and that comes closest to expressing the intention of the invalid or unenforceable term or provision, and this Arbitration Agreement shall be enforceable as so modified. If a court decides that any of the provisions of clause (b) of this Arbitration Agreement is invalid or unenforceable, then the entirety of this Arbitration Agreement shall be null and void, unless such provisions are deemed to be invalid or unenforceable solely with respect to claims for public injunctive relief. The remainder of this Agreement will continue to apply.<br></br><br></br>
    </List.Item>
    
    <List.Item as='li' id='terms18'>Future Changes to Arbitration Agreement<br></br><br></br>
    Notwithstanding any provision in this Agreement to the contrary, iCast agrees that if it makes any future change to this Arbitration Agreement (other than a change to the Notice Address) while you are a user of the Services, you may reject any such change by sending iCast written notice within thirty (30) calendar days of the change to the Notice Address provided above. By rejecting any future change, you are agreeing that you will arbitrate any dispute between us in accordance with the language of this Arbitration Agreement.<br></br><br></br>
    </List.Item>
    </List>
    </Grid.Row>



    <Grid.Row textAlign='center' style={{ padding: '4em 0em 2em 0em' }}>
      <Header as='h2' style={{color:'#002556'}}>General provisions</Header>
    </Grid.Row>

    <Grid.Row  textAlign='center'>
    <List>
    <List.Item>
    This Agreement shall be governed by, and construed in accordance with, the laws of the HKSAR, without regard to any choice of law, conflicts of law or other principles that would result in the applicable of the laws or regulations of any other jurisdiction. Subject to the section titled “Arbitration”, any legal action or proceeding relating to this Agreement shall be instituted in HKSAR. You and iCast agree to submit to the jurisdiction of, and agree that venue is proper in, these courts in any such legal action or proceeding.<br></br><br></br>
    This Agreement and the rights and obligations herein are personal to you, and you may not assign or otherwise transfer this Agreement or any of your rights or obligations hereunder, by operation of law or otherwise, without the prior written consent of iCast. iCast may freely assign this Agreement, including, without limitation, in connection with a merger, acquisition, bankruptcy, reorganization, or sale of some or all of our assets or stock.<br></br><br></br>
    If any one or more of the provisions of this Agreement are for any reason held to be invalid, illegal or unenforceable by a court of competent jurisdiction, the remaining provisions of this Agreement shall be unimpaired and shall remain in full force and effect, and the invalid, illegal or unenforceable provision(s) shall be replaced by a valid, legal and enforceable provision or provisions that comes closest to the intent of the parties underlying the invalid, illegal or unenforceable provision(s).<br></br><br></br>
    The failure of either party to exercise in any respect any right provided for herein shall not be deemed a waiver of any further rights hereunder. A waiver by either party of any term or condition of this Agreement or any breach thereof, in any one instance, will not waive such term or condition or any subsequent breach thereof.<br></br><br></br>
    If iCast is unable to perform any obligation under this Agreement because of any matter beyond its reasonable control, such as lightning, flood, exceptionally severe weather, fire, explosion, war, civil disorder, industrial disputes (whether or not involving employees of iCast), acts of local or central government or other competent authorities, problems with telecommunications providers, hostile network attacks or other events beyond iCast’s reasonable control (each, a “Force Majeure Event”), iCast will have no liability to you for such failure to perform; provided, however, that iCast shall resume performance promptly upon removal of the circumstances constituting the Force Majeure Event. If any Force Majeure Event continues for more than sixty (60) days, either iCast or you may terminate this Agreement by delivery of written notice to the other party. You will remain responsible for all Fees incurred through the last day the Services were available.<br></br><br></br>
    If you and iCast have executed a separate Subscription Agreement applicable to your access to and use of the Site, Services and/or Software, then the terms and conditions of such Subscription Agreement shall prevail to the extent of any conflict with the terms and conditions of this Agreement. In all other cases, this Agreement constitutes the entire agreement between iCast and you with respect to its subject matter, and supersedes all prior communications and proposals, whether electronic, oral or written, between iCast and you. No waiver or modification of any of the provisions of this Agreement shall be binding unless in writing and signed by a duly authorized representative of each party.
    </List.Item>
    </List>  
    </Grid.Row>


  </Container>
  </Segment>
)

export default privacy