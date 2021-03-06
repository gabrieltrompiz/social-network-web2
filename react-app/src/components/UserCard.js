import React from 'react';
import { Image } from 'semantic-ui-react';

export default class UserCard extends React.Component {

	handleClick = () => {
		this.props.changeUser(this.props.user);
        this.props.changeView('OtherUserProfile');
	}

	render() {
		const source = "http://localhost:8080/files?type=avatar&file=" + this.props.user.username + ".png"
		const dark = this.props.darkTheme
		const styles = this.getStyles(dark)
		return(
			<div style={styles.container} onClick={() => this.handleClick(this.props.user)}>
				{this.props.user.username !== null && <Image
					src={source}
					circular={true}
					style={{ width: 70, height: 70, margin: 'auto', marginTop: 16 }}
				/>}
				<p style={styles.username}>{this.props.user.username}</p>
				<p style={styles.name}>{this.props.user.name + " " + this.props.user.lastName}</p>
			</div>
		);
	}

	getStyles = (dark) => {
		const styles = {
			container: {
				width: '32%',
				height: '25%',
				marginTop: 5,
				marginBottom: 5,
				marginRight: '0.5%',
				marginLeft: '0.5%',
				borderColor: dark ? '#15202B' : '#F0F0F2',
				borderWidth: 1,
				borderStyle: 'solid',
				boxShadow: '0 0 37px -2px rgba(0,0,0,0.1)',
				borderRadius: 20,
				backgroundColor: dark ? '#15202B' : 'white',
				textAlign: 'center',
				cursor: 'pointer'
			},
			username: {
				margin: 0,
				marginTop: 5,
				fontWeight: '700',
				fontSize: 16,
				color: dark ? 'white' : 'black'
			},
			name: {
				fontWeight: '100',
				fontSize: 16,
				color: dark ? 'white' : 'black'
			}
		}
		return styles
	}
}