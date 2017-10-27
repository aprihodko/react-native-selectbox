import React from 'react';
import { View, Modal, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import styles from './Styles';

class Selectbox extends React.Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false
    };
  }

  _onChange = (item) => {
    this.props.onChange(item);
    this._close();
  };

  _close = () => {
    this.setState({
      modalVisible: false
    });
  };

  _open = () => {
    this.setState({
      modalVisible: true
    });
  };

  _renderSection = (section) => {
    return (
      <View key={section.key} style={styles.sectionStyle}>
        <Text style={styles.sectionLabelStyle}>{ section.label + '' }</Text>
      </View>
    );
  };

  _renderOption = (option) => {
    return (
      <TouchableOpacity key={option.key} onPress={() => this._onChange(option)}>
        <View style={styles.optionStyle}>
          <Text style={[styles.optionLabelStyle, this.props.optionLabelStyle]}>{ option.label + '' }</Text>
        </View>
      </TouchableOpacity>);
  };

  _renderOptionList = () => {
    const options = this.props.items.map((item) => {
      if (item.section) {
        return this._renderSection(item);
      }
      return this._renderOption(item);
    });

    return (
      <View style={styles.overlayStyle}>
        { this.props.promptLabel ?
          (
            <View style={styles.promptContainer}>
              <View style={styles.promptStyle}>
                <Text style={styles.promptLabelStyle}>{this.props.promptLabel + ''}</Text>
              </View>
            </View>
          ) : null
        }
        <View style={styles.optionContainer}>
          <ScrollView keyboardShouldPersistTaps="always">
            <View style={styles.optionContainerInnerContainer}>
              {options}
            </View>
          </ScrollView>
        </View>
        <View style={styles.cancelContainer}>
          <TouchableOpacity onPress={this._close}>
            <View style={styles.cancelStyle}>
              <Text style={styles.cancelLabelStyle}>{this.props.cancelLabel + ''}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>);
  };

  _renderChildren() {
    if (this.props.children) {
      return this.props.children;
    }

    return (
      <View style={styles.selectStyle}>
        <View style={styles.selectContainerStyle}>
          <Text
            style={[styles.selectLabelStyle, this.props.selectLabelStyle]}
          >{this.props.selectedItem.label + ''}</Text>
          <Icon name="chevron-down" />
        </View>
      </View>);
  }

  render() {
    const modal = (
      <Modal
        transparent={this.props.transparent} ref="modal" visible={this.state.modalVisible}
        onRequestClose={this._close} animationType={this.props.animationType}
      >
        {this._renderOptionList()}
      </Modal>
    );

    return (
      <View style={this.props.style}>
        {modal}
        <TouchableOpacity onPress={this._open}>
          {this._renderChildren()}
        </TouchableOpacity>
      </View>
    );
  }
}

Selectbox.propTypes = {
  items: PropTypes.array,
  selectedItem: PropTypes.object,
  promptLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  onChange: PropTypes.func,
  animationType: PropTypes.string,
  transparent: PropTypes.bool,
  style: View.propTypes.style,
  optionLabelStyle: PropTypes.object,
  selectLabelStyle: PropTypes.object,
  children: PropTypes.any
};

Selectbox.defaultProps = {
  items: [],
  onChange: () => {},
  cancelLabel: 'cancel',
  animationType: 'slide',
  transparent: false
};

export default Selectbox;
