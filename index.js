import React, { Component, Dimensions } from 'react';
import { Text, StatusBar, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import ScaleImage from 'mainam-react-native-scaleimage';
import DismissKeyboard from 'mainam-react-native-dismiss-keyboard';
import { Container, Header } from 'native-base';
import {
    Platform,
    StyleSheet,
    Image,
    View
} from 'react-native';

import ic_back from './images/ic_back.png';


export default class ActivityPanel extends Component {
    constructor(props) {
        super(props);
    }
    onLayout() {
        if (this.props.onLayout) {
            this.props.onLayout();
        }
    }
    backButtonClick() {
        if (this.props.backButtonClick)
            this.props.backButtonClick();
    }
    renderView() {
        return (
            <Container>

                <View onLayout={this.onLayout.bind(this)} style={[{ flex: 1, backgroundColor: 'white', paddingTop: this.props.showFullScreen ? 0 : this.props.paddingTop }, this.props.style]} >
                    {
                        !this.props.hideActionbar &&
                        <Header translucent={this.props.translucent} iosBarStyle={this.props.iosBarStyle ? this.props.iosBarStyle : "default"} style={[{ borderBottomWidth: 0, height: 0, backgroundColor: this.props.statusbarBackgroundColor }, this.props.statusbarBackgroundColor ? { backgroundColor: this.props.statusbarBackgroundColor } : {}]}
                            androidStatusBarColor={this.props.statusbarBackgroundColor}
                        >
                        </Header>
                    }
                    {
                        !this.props.hideActionbar ?
                            this.props.actionbar ?
                                this.props.actionbar() :
                                <View style={[styles.actionbar, this.props.actionbarStyle]}>
                                    {
                                        !this.props.hideBackButton ?

                                            <TouchableOpacity onPress={() => this.backButtonClick()}>
                                                <ScaleImage source={this.props.icBack ? this.props.icBack : ic_back} style={styles.ic_back} width={24}></ScaleImage>
                                            </TouchableOpacity>
                                            :
                                            <View style={styles.ic_back} />
                                    }
                                    <Text style={[styles.title, this.props.actionbarTextColor]}>
                                        {this.props.title}
                                    </Text>
                                    <View style={styles.menuButton}>
                                        {
                                            this.props.menuButton
                                        }
                                    </View>
                                </View> : null
                    }
                    <View style={[styles.container, this.props.containerStyle]}>
                        {this.props.children}
                    </View>
                    {
                        this.props.isLoading ?
                            !this.props.loadingView ?
                                <View style={{ position: "absolute", backgroundColor: "#bfeaff94", flex: 1, top: 0, right: 0, left: 0, bottom: 0, alignItems: 'center', justifyContent: "center" }} >
                                    <ScaleImage width={40} source={require("./images/loading.gif")} />
                                </View>
                                :
                                <View style={{ position: "absolute", flex: 1, top: 0, right: 0, left: 0, bottom: 0, alignItems: 'center', justifyContent: "center" }} >
                                    {
                                        this.props.loadingView
                                    }
                                </View> : null
                    }

                </View>
            </Container>
        );
    }
    render() {
        if (this.props.touchToDismiss)
            return (
                <DismissKeyboard>
                    {this.renderView()}
                </DismissKeyboard>
            );
        return (this.renderView());
    }
}

ActivityPanel.propTypes = {
    paddingTop: PropTypes.number,
    isLoading: PropTypes.bool,
    showFullScreen: PropTypes.bool,
    hideActionbar: PropTypes.bool,
    onLayout: PropTypes.func,
    title: PropTypes.string,
    actionbarTextColor: PropTypes.any,
    menuButton: PropTypes.element,
    loadingView: PropTypes.element,
    hideBackButton: PropTypes.bool,
    hideStatusbar: PropTypes.bool
}
const styles = StyleSheet.create({
    menuButton: {
        minWidth: 54,
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        flex: 1,
        textAlign: 'center'
    },
    ic_back: {
        marginLeft: 10,
        marginRight: 20,
        top: 0, left: 0,
        zIndex: 100
    },
    actionbar: {
        justifyContent: 'space-between',
        elevation: 5,
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#006ac6'
    },
    container: {
        flex: 1
    },
});