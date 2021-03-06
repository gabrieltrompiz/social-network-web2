import React from 'react'

export default class Button extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hover: false }
    }

    render(){
        const outlined = {
            backgroundColor: this.state.hover ? this.props.color : 'transparent',
            borderRadius: this.props.changeRadius ? this.props.borderRadius : 5,
            borderWidth: 1.5,
            borderColor: this.props.color,
            borderStyle: 'solid',
            width: this.props.width,
            height: this.props.height,
            color: this.state.hover ? 'white' : this.props.color,
            cursor: this.state.hover ? 'pointer' : 'auto',
            transitionDuration: '0.2s',
            outline: 0,
            marginLeft: this.props.marginLeft,
            marginRight: this.props.marginRight,
            marginTop: this.props.marginTop,
            marginBottom: this.props.marginBottom,
            fontFamily: this.props.fontFamily,
            fontSize: this.props.fontSize
        }
        const filled = {
            backgroundColor: this.props.color,
            borderRadius: this.props.changeRadius ? this.props.borderRadius : 5,
            borderWidth: 1.5,
            borderColor: this.props.color,
            borderStyle: 'solid',
            width: this.props.width,
            height: this.props.height,
            color: 'white',
            filter: this.state.hover ? 'brightness(90%)' : '',
            cursor: this.state.hover ? 'pointer' : 'auto',
            transitionDuration: '0.2s',
            outline: 0,
            marginLeft: this.props.marginLeft,
            marginRight: this.props.marginRight,
            marginTop: this.props.marginTop,
            marginBottom: this.props.marginBottom,
            fontFamily: this.props.fontFamily,
            fontSize: this.props.fontSize
        }

        const style = this.props.outlined ? outlined : filled;
        return(
            <button 
            style={style}
            onMouseOver={() => this.setState({ hover: true })}
            onMouseOut={() => this.setState({ hover: false })}
            onClick={this.props.onClick}>
                {this.props.children}
            </button>
        );
    }
}