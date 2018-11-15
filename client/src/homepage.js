import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container text >
  <Header
      as= 'h1'
content = 'Zow'
inverted
style = {{
  fontSize: mobile ? '2em' : '4em',
    fontWeight: 'bold',
      marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
/>
  < Header
as = 'h2'
content = 'Hassle-Free Club Recruiting'
inverted
style = {{
  fontSize: mobile ? '1.5em' : '1.7em',
    fontWeight: 'normal',
      marginTop: mobile ? '0.5em' : '1.5em',
      }}
/>
  < Button
primary size = 'huge'
style = {{
  backgroundColor: 'rgb(' + 255 + ',' + 110 + ',' + 60 + ')',
      }}>
  Get Started
    < Icon name = 'right arrow' />
      </Button>
      < /Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Responsive minWidth= { Responsive.onlyTablet.minWidth } >
      <Visibility
          once={ false }
    onBottomPassed = { this.showFixedMenu }
    onBottomPassedReverse = { this.hideFixedMenu }
      >
      <Segment
            inverted
    textAlign = 'center'
    style = {{ minHeight: 700, padding: '1em 0em', backgroundColor: 'rgb(' + 47 + ',' + 72 + ',' + 88 + ')' }
  }
  vertical
          >
  <Menu
              fixed={ fixed ? 'top' : null }
inverted = {!fixed}
pointing = {!fixed}
secondary = {!fixed}
size = 'large'
  >
  <Container>
  <Menu.Item as='a' active > Home < /Menu.Item>
    < Menu.Item as='a' > About < /Menu.Item>
      < Menu.Item position = 'right' >
        <Button as='a' inverted = {!fixed}> Login < /Button>
          < Button as='a' inverted = {!fixed} primary = { fixed } style = {{ marginLeft: '0.5em' }}> Sign Up < /Button>
            < /Menu.Item>
            < /Container>
            < /Menu>
            < HomepageHeading />
            </Segment>
            < /Visibility>

{ children }
</Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handlePusherClick = () => {
    const { sidebarOpened } = this.state

    if (sidebarOpened) this.setState({ sidebarOpened: false })
  }

  handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive maxWidth= { Responsive.onlyMobile.maxWidth } >
      <Sidebar.Pushable>
      <Sidebar as={ Menu } animation = 'uncover' inverted vertical visible = { sidebarOpened }
    style = {{
      backgroundColor: 'rgb(' + 47 + ',' + 72 + ',' + 88 + ')',
          }
  }>
    <Menu.Item as='a' active > Home < /Menu.Item>
      < Menu.Item as='a' > About < /Menu.Item>
        < Menu.Item as='a' > Login < /Menu.Item>
          < Menu.Item as='a' > Sign Up < /Menu.Item>
            < /Sidebar>

            < Sidebar.Pusher
dimmed = { sidebarOpened }
onClick = { this.handlePusherClick }
style = {{ minHeight: '100vh' }}
          >
  <Segment
              inverted
textAlign = 'center'
style = {{
  minHeight: 350, padding: '1em 0em', backgroundColor: 'rgb(' + 47 + ',' + 72 + ',' + 88 + ')'
}}
vertical
  >
  <Container>
  <Menu inverted pointing secondary size = 'large' >
    <Menu.Item onClick={ this.handleToggle }>
      <Icon name='sidebar' />
        </Menu.Item>
        < Menu.Item position = 'right' >
          <Button as='a' inverted >
            Login
            < /Button>
            < Button as='a' inverted style = {{ marginLeft: '0.5em' }}>
              Sign Up
                < /Button>
                < /Menu.Item>
                < /Menu>
                < /Container>
                < HomepageHeading mobile />
                  </Segment>

{ children }
</Sidebar.Pusher>
  < /Sidebar.Pushable>
  < /Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <div>
  <DesktopContainer>{ children } < /DesktopContainer>
  < MobileContainer > { children } < /MobileContainer>
  < /div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const HomepageLayout = () => (
  <ResponsiveContainer>
  <Segment style= {{ padding: '8em 0em' }} vertical >
    <Grid container stackable verticalAlign = 'middle' >
      <Grid.Row>
      <Grid.Column width={ 8 }>
        <Header as='h3' style = {{ fontSize: '2em' }}>
          Our Mission
            < /Header>
            < p style = {{ fontSize: '1.33em' }}>
              Provide a streamlined, centralized, and secure platform for the student organization recruiting process.
            < /p>
                < /Grid.Column>
                < Grid.Column floated = 'right' width = { 6} >
                  <Image size = 'large' src = 'images/cow.png' />
                    </Grid.Column>
                    < /Grid.Row>
                    < Grid.Row >
                    <Grid.Column textAlign='center' >
                      <Button size='huge' > Try Zow Now < /Button>
                        < /Grid.Column>
                        < /Grid.Row>
                        < /Grid>
                        < /Segment>
                        < Segment inverted vertical style = {{ backgroundColor: 'rgb(' + 255 + ',' + 110 + ',' + 60 + ')', padding: '5em 0em' }}>
                          <Container>
                          <Grid divided inverted stackable >
                            <Grid.Row>
                            <Grid.Column width={ 3 }>
                              <Header inverted as='h4' content = 'About' />
                                <List link inverted >
                                  <List.Item as='a' > Sitemap < /List.Item>
                                    < List.Item as='a' > Contact Us < /List.Item>
                                      < /List>
                                      < /Grid.Column>
                                      < Grid.Column width = { 3} >
                                        <Header inverted as='h4' content = 'Services' />
                                          <List link inverted >
                                            <List.Item as='a' > Recruiter Login < /List.Item>
                                              < List.Item as='a' > Applicant Login < /List.Item>
                                                < /List>
                                                < /Grid.Column>
                                                < /Grid.Row>
                                                < /Grid>
                                                < /Container>
                                                < /Segment>
                                                < /ResponsiveContainer>
)
export default HomepageLayout

