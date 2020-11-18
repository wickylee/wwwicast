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
      <Header style={{  color:'#002556', fontSize: '2em' }} textAlign='center' as='h1'>FAQ</Header>
    </Grid.Row>

    <Grid.Row textAlign='center'>
    <List ordered>
      <List.Item>
        <List.Header style={{color:'#002556'}} >Is iCast free?</List.Header>
      </List.Item>
      <List.Item as='li'  style={{ padding: '0em 0em 1em 0em' }} >
        iCast offer FREE demo trial period for 21 days, you only need to go to our website to register an user account and start using it for free.
      </List.Item>

      <List.Item>
        <List.Header style={{color:'#002556'}} >How many display can iCast support?</List.Header>
      </List.Item>
      <List.Item as='li'  style={{ padding: '0em 0em 1em 0em' }} >
      There is no limit on number of displays that iCast can support, the limitation comes from the hardware you choose to deploy your digital signage system. Each company has its own requirement on the broadcast frequency, media content and functions that they are planning to deploy in their digital signage system. For most small to medium companies, a basic media box should be good enough for each panel. For larger deployment, please contact our sales for further information.
      </List.Item>
      
      <List.Item>
        <List.Header style={{color:'#002556'}} >Is there any user manual to guide system setup?</List.Header>
      </List.Item>
      <List.Item as='li'  style={{ padding: '0em 0em 1em 0em' }} >
      We have user guide to guide iCast user to setup their digital signage system. iCast also provide online video training to help customer to manage their pace to pick up the system usage training.
      </List.Item>

      <List.Item>
        <List.Header style={{color:'#002556'}} >After the free trial service, what should I do if I wanted to continue using the iCast service?</List.Header>
      </List.Item>
      <List.Item as='li'  style={{ padding: '0em 0em 1em 0em' }} >
      After the free trial period, if you are happy to use iCast service, you need to subscribe the iCast service plan, please go to subscription page to choose your plan.
      </List.Item>

      <List.Item>
        <List.Header style={{color:'#002556'}} >How to increase storage and display number?</List.Header>
      </List.Item>
      <List.Item as='li'  style={{ padding: '0em 0em 1em 0em' }} >
      Customer can choose to increase the storage size and no of display in our subscription page.
      </List.Item>

      <List.Item>
        <List.Header style={{color:'#002556'}} >Why using iCast Cloud-based digital signage service?</List.Header>
      </List.Item>
      <List.Item as='li'  style={{ padding: '0em 0em 1em 0em' }} >
      iCast is the easiest way to help you to run a digital signage system. iCast will manage everything you need which include server setup, security setup, content backup and any day to day administration and technical support in system maintenance. With iCast’s full support , you can focus on creating your signage content and run your business in a more efficiency and effective manner.
      </List.Item>

      <List.Item>
        <List.Header style={{color:'#002556'}}>Why using iCast Cloud-based digital signage service?</List.Header>
      </List.Item>
      <List.Item as='li'  style={{ padding: '0em 0em 1em 0em' }} >
      iCast cloud based digital signage is a marketing tool for most companies, this is the most effective way to broadcast the company’s products and services information to their customers, with centralized content management system, the business operator can display different media content at different branch and at different time to target to specific customers and attract more customers to buy their products and services.
      </List.Item>

      <List.Item>
        <List.Header style={{color:'#002556'}} >How iCast can help me to deploy the digital signage system?</List.Header>
      </List.Item>
      <List.Item as='li'  style={{ padding: '0em 0em 1em 0em' }} >
      iCast is a cloud based signage solution, all you need is desktop PC or a notebook connected to Internet,  which means customer can setup their signage system without any requirement of technical knowledge. iCast is a very user friendly and feature rich signage solution, iCast also provide email support to customer if they any problem is using the iCast service. iCast support multiple locations, multiple brands and multiple displays.
      </List.Item>

      <List.Item>
        <List.Header style={{color:'#002556'}} >Am I need to buy special hardware?</List.Header>
      </List.Item>
      <List.Item as='li'  style={{ padding: '0em 0em 1em 0em' }} >
      iCast products are deliverable as software application or as integrated solution. You can buy your own hardware (TV, video wall and media player) and configure the software on your own devices or alternatively ask iCast to provide you a total solution which include TV, media player PC , video wall units and professional services.
      </List.Item>

      <List.Item>
        <List.Header style={{color:'#002556'}} >What is the warranty of your products?</List.Header>
      </List.Item>
      <List.Item as='li'  style={{ padding: '0em 0em 1em 0em' }} >
      There is no warranty of software as iCast is a cloud based digital signage solution.
For hardware products, we offer one year, two years and three years warranty, depending on the hardware products model.
      </List.Item>

      <List.Item>
        <List.Header style={{color:'#002556'}} >How does the RMA process works?</List.Header>
      </List.Item>
      <List.Item as='li' style={{ padding: '0em 0em 0.5em 0em' }} >
      Please send your RMA request through <a href="mailto:support@icast.com.hk">support@icast.com.hk</a>:
      </List.Item>
      
      <List as='ul'>
      <List.Item as='li'>
      iCast Support Specialist will start the RMA process by opening a support ticket with the device’s serial number and support details.
      </List.Item>

      <List.Item as='li'>
      iCast will then contact the hardware vendor to process the RMA request on behalf of the customer.
      </List.Item>

      <List.Item as='li'>
      iCast will check the RMA information from the hardware vendor, iCast will inform client or reseller with return instructions.
      </List.Item>

      <List.Item as='li'>
      iCast will work closely with hardware vendor and timely inform RMA status to clients.
      </List.Item>

      <List.Item as='li'>
      All process are tracked in our Support Center ticketing system, and can be easily referenced with your ticket number.
      </List.Item>
      </List>
      
    </List>
    </Grid.Row>
    </Container>
  </Segment>
)

export default privacy