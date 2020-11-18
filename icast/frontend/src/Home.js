import React, { Component } from 'react';
import { Button } from "@blueprintjs/core";
import {
  // Button,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  Segment,
  Embed,
  Form,
  Checkbox,
} from 'semantic-ui-react';
import { Slide } from 'react-slideshow-image';
import { createMedia } from '@artsy/fresnel';
import { bool } from 'prop-types';
import axios from "axios";
import Apphelper from "./apphelper";
import ToasterBottom from "./toaster_bottom";
import Recaptcha from 'react-google-recaptcha';

Embed.propTypes = {
  active: bool,
  autoplay: bool,
  defaultActive: bool,
}
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
})

const recaptchaRef = React.createRef();

class Home extends Component {
  state = {
    name: "",
    email: "",
    subject: "",
    message: "",
    ReCAPTCHA_Pass: false,
  };

  onRecaptchaChange = () =>{
    // console.log("Captcha value:", value);
    const recaptchaValue = recaptchaRef.current.getValue();
    // console.log("Captcha value:", recaptchaValue);
    this.setState({ReCAPTCHA_Pass: (recaptchaValue != "" ) ? true: false})
  }

  checkRequestInput = () =>{
    if ( this.state.name != "" &&
          this.state.email != "" &&
          this.state.subject != "" &&
          this.state.message != ""
    ) {
      return true;
    }  else {
      return false;
    }
  }

  sendRequstForm = () =>{

    let payload = {
      name: this.state.name,
      email: this.state.email,
      subject: this.state.subject,
      message: this.state.message,
    }
    axios
      .post("/core/contactrequest/", payload)
      .then((res) => {
        this.showToast(`The request has been send. Thanks!`);
        this.setState({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
      })
      .catch((err) => {
        // console.log(err);
        Apphelper.handelApiFailed(err);
      });
  }

  showToast = (showMsg) => {
    ToasterBottom.show({ message: showMsg });
  };

  render () {

          return (
              
    <Container>
    <MediaContextProvider>
    <Media greaterThan='mobile'>  
     <Segment style={{ padding: '0em 0em' }} vertical fluid="true">
        <Slide>
          <Image src='/static/images/web-cover.jpg' as='a' href='/#contactus'/>
          <Image src='/static/images/benefit1.jpg' as='a' href='/#contactus'/>
          <Image src='/static/images/benefit2.jpg' as='a' href='/#contactus'/>
          <Image src='/static/images/benefit3.jpg' as='a' href='/#contactus'/>
          <Image src='/static/images/benefit4.jpg' as='a' href='/#contactus'/>
          <Image src='/static/images/benefit5.jpg' as='a' href='/#contactus'/>
        </Slide>
    </Segment>
    </Media>

    <Media at='mobile'>
    <Segment style={{ padding: '0em 0em' }} vertical fluid="true">
        <Slide>
          <Image src='/static/images/web-cover-sml.jpg' as='a' href='/#contactus'/>
          <Image src='/static/images/benefit1-sml.jpg' as='a' href='/#contactus'/>
          <Image src='/static/images/benefit2-sml.jpg' as='a' href='/#contactus'/>
          <Image src='/static/images/benefit3-sml.jpg' as='a' href='/#contactus'/>
          <Image src='/static/images/benefit4-sml.jpg' as='a' href='/#contactus'/>
          <Image src='/static/images/benefit5-sml.jpg' as='a' href='/#contactus'/>
        </Slide>
    </Segment>
 
    </Media>
    </MediaContextProvider>


    <Segment style={{ padding: '8em 0em' }} vertical id='features'>
    <Grid centered columns={3}>
    <Grid.Row>
      <Grid.Column textAlign='center'>
        <Header as='h3' style={{ color:'#002556', fontSize: '2em' }}>
              Features
        </Header>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column textAlign='center'>
        <Header as='h4' icon  style={{ color:'#002556' }}>
          <Icon name='sitemap'/>
          Centralize Content Management
          <Header.Subheader>
            Control different panel displays with one management console.
		      </Header.Subheader>
	      </Header>
      </Grid.Column>    
      
      <Grid.Column textAlign='center'>
        <Header as='h4' icon  style={{ color:'#002556' }}>
          <Icon name='desktop' name='tv' />
          Any Size
          <Header.Subheader>
            Supports for any resolution and both Portrait and Landscape on panel display.
            </Header.Subheader>
	      </Header>
      </Grid.Column>

      <Grid.Column textAlign='center'>
        <Header as='h4' icon  style={{ color:'#002556' }}>
          <Icon name='calendar alternate' />
          Scheduling
          <Header.Subheader>
            Schedule displays on specific date in range or dedicated date from time to time, in daily or every single day or schedule displays in loop function.
          </Header.Subheader>
	      </Header>
      </Grid.Column>
    </Grid.Row>
  
     <Grid.Row>
       <Grid.Column textAlign='center'>
        <Header as='h4' icon  style={{ color:'#002556' }}>
          <Icon name='grid layout' />
          Layout and RSS Feeds
          <Header.Subheader>
            Divide your screen to display video, weather, RSS feeds and rolling messages with multiple content zones.
          </Header.Subheader>
	      </Header>
      </Grid.Column>
      
      <Grid.Column  textAlign='center'>
        <Header as='h4' icon  style={{ color:'#002556' }}>
          <Icon name='language' />
          Multiple Languages
          <Header.Subheader>
            Support in English and Chinese
          </Header.Subheader>
	      </Header>
      </Grid.Column>
      
      <Grid.Column textAlign='center'>
        <Header as='h4' icon  style={{ color:'#002556' }}>
          <Icon name='users' />
          Role Based Administration
          <Header.Subheader>
            The role-based administration assign permission to different users to assess and manages the site settings.
          </Header.Subheader>
	      </Header>
      </Grid.Column>
    </Grid.Row> 
    
    <Grid.Row>
      <Grid.Column textAlign='center'>
        <Header as='h4' icon  style={{ color:'#002556' }}>
          <Icon name='file video' />
          Multiple File Formats
          <Header.Subheader>
            Supports Image (.jpeg/.png/ .gif), PDF (.pdf), Video (.mp4/ .webm/ .ogg)
          </Header.Subheader>
        </Header>
      </Grid.Column>
      
      <Grid.Column textAlign='center'>
        <Header as='h4' icon  style={{ color:'#002556' }}>
          <Icon name='grab' />
          Drag and Drop
          <Header.Subheader>
            Drag and drop user interface in content management.
          </Header.Subheader>
        </Header>
      </Grid.Column>

      <Grid.Column textAlign='center'>
        <Header as='h4' icon  style={{ color:'#002556' }}>
          <Icon name='windows' />
          Support multiple OS
          <Header.Subheader>
            Support Windows, Linux, Android OS
          </Header.Subheader>
          </Header>
      </Grid.Column>
    </Grid.Row>
  
    </Grid>
    </Segment>
    
    <Segment style={{ padding: '8em 0em' }} vertical id='aboutus'>
      <Grid container stackable verticalAlign='middle' textAlign='justified'>
        <Grid.Row>
           <Grid.Column floated='right' width={8}>
            <Image src='/static/images/iCast-animate.gif' />
          </Grid.Column>

        	<Grid.Column width={8}>
            <Header as='h3' style={{  color:'#002556', fontSize: '2em' }}>
              About Us
            </Header>
            <p style={{ fontSize: '1em' }}>
              <b>iCast</b> is a suite of end-to-end cloud-based digital signage solutions designed for the modern business operators, with the explosive growth in cloud based signage applications deployed in the market, companies are seeking next generation digital signage solution that deliver high performance, real time and cost effective application that can help them to achieve their strategic goals. <b>iCast</b> delivers all of these critical capabilities that make <b>iCast</b> be your best digital signage partner.<br></br><br></br>
              <b>iCast</b> technical team has more than 10 years of experience delivering innovative signage solutions for company of all sizes. <b>iCast</b> enterprise-grade digital signage solutions help you to communicate and engage your customers more dynamically and effectively than you ever think of.<br></br><br></br>
              Our cloud based digital signage solutions meet the unique needs of various market segments, including retail, restaurant, education, healthcare, finance and banking and government. We manage installation, hosting, maintenance and support so our customers can focus on their business operation.
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: '0em' }} vertical id='contactus'>
      <Grid celled='internally' columns='equal' stackable>

        <Grid.Row textAlign='left'>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Embed active autoplay={true} iframe='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1845.568126243662!2d114.22314557472873!3d22.310686197742605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x340401459c8de1c7%3A0xcfd842f79c091ac8!2z6KeA5aGY6ZaL5rqQ6YGTNTXomZ_plovoga_lt6Xmpa3kuK3lv4M!5e0!3m2!1szh-TW!2shk!4v1600939412642!5m2!1szh-TW!2shk'/>            
          </Grid.Column>
          
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{  color:'#002556', fontSize: '2em' }}>CONTACT</Header>
	          <Header as='h2'>
            <Header   style={{ color:'#002556' }} icon='map marker alternate' size='small' subheader='Room 510, 5/F., Block B,' textAlign='left'/>
            <Header   style={{ color:'#002556' }} icon='' size='small' subheader='Hoi Luen Industrial Centre,' textAlign='left'/>
            <Header   style={{ color:'#002556' }} icon='' size='small' subheader='55 Hoi Yuen Road,Kwun Tong, Kowloon.' textAlign='left'/>
            <Header  style={{ color:'#002556' }}  icon='phone' size='small' subheader='Phone: +852 2556 2162' />
            <Header   style={{ color:'#002556' }} icon='mail' size='small' as='a' href='mailto:sales@icast.com.hk' subheader='sales@icast.com.hk'/>
            </Header>
            <Form>
              <Form.Field>
                <label>Name</label>
                <input placeholder='Name' value={this.state.name} onChange={(e)=>this.setState({name: e.target.value})} />
              </Form.Field>
              <Form.Field>
                <label>Email</label>
                <input placeholder='Email' type="email" value={this.state.email} onChange={(e)=>this.setState({email: e.target.value})} />
              </Form.Field>
              <Form.Field>
                <label>Subject</label>
                <input placeholder='Subject' value={this.state.subject} onChange={(e)=>this.setState({subject: e.target.value})} />
              </Form.Field>
              <Form.Field>
                <label>Message</label>
                <input placeholder='Message' value={this.state.message} onChange={(e)=>this.setState({message: e.target.value})} />
              </Form.Field>
              <Form.Field>
                <Recaptcha
                        ref={recaptchaRef}
                        sitekey="6LdtWNYZAAAAAHcwHYN4nyhmh9kExcIiJnb3QtLB"
                        onChange={this.onRecaptchaChange}
                    />
                </Form.Field>
                <Button intent="primary" large={true}
                rightIcon="send-message"
                onClick={this.sendRequstForm}
                disabled={!this.state.ReCAPTCHA_Pass || !this.checkRequestInput()}
                >SEND MESSAGE </Button>
              </Form>  
          </Grid.Column>

        </Grid.Row>
      </Grid>
    </Segment>
    </Container>
          );
      }
}
export default Home