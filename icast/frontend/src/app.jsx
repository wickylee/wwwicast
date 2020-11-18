import React, { Component} from "react";
import { createMedia } from '@artsy/fresnel';
import PropTypes from 'prop-types';
// import { Switch, Route } from "react-router-dom";
//-- frontend components --
// import NavMenu from "./components/nav_menu";
// import HomeView from "./contents/home_view";
// import FeaturesView from "./contents/features_view";
import SubscriptionFlow from "./subscription/subscription_flow";
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Dropdown,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react';
import { BrowserRouter, Route, Switch, } from 'react-router-dom';
import Home from "./Home";
import faq from './faq';
import privacy from './privacy';
import terms from './terms';
// import signup_subscribe from './signup_subscribe'
// import signup_service from './signup_service'
// import signup_account from './signup_account'
// import signup_confirm from './signup_confirm'
// import signup_process from './signup_process'
// import signup_complete from './signup_complete'

// class App extends Component {
//   // componentDidMount() {
//   // }

//   render() {
//     return (
//       <div className="app-root">
//         <div className="app-container">
//           <div className="nav-menu">
//             <NavMenu />
//           </div>
//           <Switch>
//             {/* <Route exact path="/" component={HomeView} /> */}
//             <Route exact path="/home" component={HomeView} />
//             <Route exact path="/features" component={FeaturesView} />
//             <Route exact path="/Subscribe" component={SubscribeView} />
//           </Switch>
//         </div>
//       </div>
//     );
//   }
// }


// export default App;

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
})

class DesktopContainer extends Component {
  state = {enableSubscription: true}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Media greaterThan='mobile'>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            
            textAlign='center'
            style={{ minHeight: 0, padding: '0em 0em' }}
            vertical
          >
            <Menu
              style={{backgroundColor: '#002556',padding: '0.5em 0em'}}
              inverted
              fixed={fixed ? 'top' : null}              
              pointing={!fixed}
              secondary={!fixed}
            >
              
            <Container>
              <Menu.Item as='a' href='/'> <Image height='22px' src='/static/images/icast-logo.png' /></Menu.Item>
              <Menu.Item as='a' href='/'>HOME</Menu.Item>
              <Menu.Item as='a' href='/#features'>FEATURES</Menu.Item>
              <Menu.Item>
              <Dropdown text ='RESOURCES' pointing >
                  <Dropdown.Menu>
                    <Dropdown.Item as='a' href='/faq'>FAQ</Dropdown.Item>
                    <Dropdown.Item as='a' href='/privacy'>Privacy Policy</Dropdown.Item>
                    <Dropdown.Item as='a' href='/terms'>Terms and Conditions</Dropdown.Item>
                  </Dropdown.Menu>
		            </Dropdown>
              </Menu.Item>
              <Menu.Item>
                <Dropdown text ='COMPANY' pointing>
                  <Dropdown.Menu>
                    <Dropdown.Item as='a' href='/#aboutus'>About Us</Dropdown.Item>
                    <Dropdown.Item as='a' href='/#contactus'>Contact Us</Dropdown.Item>
                  </Dropdown.Menu>
		            </Dropdown>
              </Menu.Item>
              {/*{this.state.enableSubscription ?
		          <Menu.Item position='right'>
                 <Menu.Item  as='a'  href='/signup_subscribe'><Button basic inverted>LOGIN</Button></Menu.Item> 
                <Menu.Item as='a' href='/subscribe'><Button basic inverted>{"SIGN UP & SUBSCRIBE"}</Button></Menu.Item>
              </Menu.Item>
              :<></>}*/}
		
              </Container>
            </Menu>
           </Segment>
        </Visibility>

        {children}
      </Media>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {enableSubscription: true}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Media as={Sidebar.Pushable} at='mobile'>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            style={{backgroundColor: '#002556'}}
            animation='overlay'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={sidebarOpened}
          >
            <Menu.Item as='a' onClick={this.handleSidebarHide}><Icon name='close' />CLOSE</Menu.Item>
            <Menu.Item as='a' href='/'>HOME</Menu.Item>
            <Menu.Item as='a' href='/#features' onClick={this.handleSidebarHide}>FEATURES</Menu.Item>
		        <Menu.Item>
		          <Dropdown text ='RESOURCES' pointing>
		          <Dropdown.Menu>
                <Dropdown.Item as='a' href='/faq'>FAQ</Dropdown.Item>
                <Dropdown.Item as='a' href='/privacy'>Privacy Policy</Dropdown.Item>
                <Dropdown.Item as='a' href='/terms'>Terms and Conditions</Dropdown.Item>
              </Dropdown.Menu>
		          </Dropdown>
            </Menu.Item>
		        <Menu.Item>
		          <Dropdown text ='COMPANY' pointing>
		          <Dropdown.Menu>
                <Dropdown.Item as='a' href='/#aboutus' onClick={this.handleSidebarHide}>About Us</Dropdown.Item>
                <Dropdown.Item as='a' href='/#contactus' onClick={this.handleSidebarHide}>Contact Us</Dropdown.Item>
              </Dropdown.Menu>
		          </Dropdown>
            </Menu.Item>
            {/*{this.state.enableSubscription ?
              // <Menu.Item  as='a'  href='/signup_subscribe'><Button basic inverted>LOGIN</Button></Menu.Item>
              <Menu.Item as='a' href='/subscribe'><Button basic inverted>{"SIGN UP & SUBSCRIBE"}</Button></Menu.Item>
              : <></>}*/}
            </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              inverted
              textAlign='center'
              style={{backgroundColor: '#002556', minHeight: 0, padding: '0.5em 0em' }}
              vertical
            >
              <Container>
                <Menu style={{backgroundColor: '#002556'}} inverted pointing secondary size='small'>
                <Menu.Item as='a' href='/'> <Image height='22px' src='/static/images/icast-logo.png' /></Menu.Item>
                <Menu.Item position='right' onClick={this.handleToggle}>
                   <Icon size='large' name='sidebar' />
                </Menu.Item>
                </Menu>
              </Container>

            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Media>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  /* Heads up!
   * For large applications it may not be best option to put all page into these containers at
   * they will be rendered twice for SSR.
   */
  <MediaContextProvider>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </MediaContextProvider>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const HomepageLayout = () => (


  <ResponsiveContainer>
  		
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/faq" component={faq} />
      <Route exact path="/privacy" component={privacy} />
      <Route exact path="/terms" component={terms} />
      <Route exact path="/subscribe" component={SubscriptionFlow} />
      {/* <Route exact path="/signup_subscribe" component={signup_subscribe} />
      <Route exact path="/signup_service" component={signup_service} />
      <Route exact path="/signup_account" component={signup_account} />
      <Route exact path="/signup_confirm" component={signup_confirm} />
      <Route exact path="/signup_process" component={signup_process} />
      <Route exact path="/signup_complete" component={signup_complete} /> */}
    </Switch>
  </BrowserRouter>

    <Segment inverted vertical style={{ backgroundColor:'#002556', padding: '5em 0em' }}>
      <Container>
        <Grid  style={{backgroundColor:'#002556'}} divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='iCast' />
              <List link inverted>
                <List.Item as='a' href='/'>Home</List.Item>
                <List.Item as='a' href='/#features'>Features</List.Item>
                <List.Item as='a' href='/faq'>FAQ</List.Item>
                <List.Item as='a' href='/privacy'>Privacy Policy</List.Item>
                <List.Item as='a' href='/terms'>Terms and Conditions</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Company' />
              <List link inverted>
                <List.Item as='a' href='/#aboutus'>About Us</List.Item>
                <List.Item as='a' href='/#contactus'>Contact Us</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h4' inverted>
                Contact
              </Header>
              <List link inverted>
                <List.Item as='a'>Phone: +852 2556 2162</List.Item>
                <List.Item as='a' href='mailto:sales@icast.com.hk'>Email: sales@icast.com.hk
                {/* <a href='mailto:sales@icast.com.hk'>sales@icast.com.hk</a> */}
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
)

export default HomepageLayout
