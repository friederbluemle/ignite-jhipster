import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ScrollView, Image, BackAndroid } from 'react-native'
import styles from './Styles/DrawerContentStyles'
import { Images } from '../Themes'
import DrawerButton from '../Components/DrawerButton'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import LoginActions from '../Redux/LoginRedux'
import { isLoggedIn } from '../Redux/AccountRedux'

class DrawerContent extends Component {
  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.context.drawer.props.open) {
        this.toggleDrawer()
        return true
      }
      return false
    })
  }

  toggleDrawer () {
    this.context.drawer.toggle()
  }

  handlePressLogin = () => {
    this.toggleDrawer()
    NavigationActions.login()
  }
  handlePressRegister = () => {
    this.toggleDrawer()
    NavigationActions.register()
  }
  handlePressForgotPassword = () => {
    this.toggleDrawer()
    NavigationActions.forgotPassword()
  }
  handlePressEntities = () => {
    this.toggleDrawer()
    NavigationActions.entities()
  }
  handlePressSettings = () => {
    this.toggleDrawer()
    NavigationActions.settings()
  }
  handlePressChangePassword = () => {
    this.toggleDrawer()
    NavigationActions.changePassword()
  }
  handlePressLogout = () => {
    this.toggleDrawer()
    this.props.logout()
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Image source={Images.logoJhipster} style={styles.logo} />
        {!this.props.loggedIn && (<DrawerButton text='Login' onPress={this.handlePressLogin} />)}
        {!this.props.loggedIn && (<DrawerButton text='Register' onPress={this.handlePressRegister} />)}
        {!this.props.loggedIn && (<DrawerButton text='Forgot Password' onPress={this.handlePressForgotPassword} />)}

        {this.props.loggedIn && (<DrawerButton text='Entities' onPress={this.handlePressEntities} />)}
        {this.props.loggedIn && (<DrawerButton text='Settings' onPress={this.handlePressSettings} />)}
        {this.props.loggedIn && (<DrawerButton text='Change Password' onPress={this.handlePressChangePassword} />)}
        {this.props.loggedIn && (<DrawerButton text='Logout' onPress={this.handlePressLogout} />)}
      </ScrollView>
    )
  }
}

DrawerContent.contextTypes = {
  drawer: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    loggedIn: isLoggedIn(state.account)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(LoginActions.logoutRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)
