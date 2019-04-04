import React from 'react';
import { Container } from 'semantic-ui-react';
import Poster from '../components/Poster.js';
import Post from '../components/Post.js';

export default class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = { user: this.props.user, posts: [] }
	}

	componentDidMount = async () => {
		await fetch('http://localhost:8080/feed', { credentials: 'include' })
			.then(response => response.json())
			.then(response => {
				if(response.status === 200) {
					this.setState({ posts: response.data})
				}
			});
	}

	render() {
		const test = { user: 'gabtrompiz', text: 'hee hee', name: 'Gabriel Trompiz' }
		console.log(this.state.posts.length)
		return(
			<div style={{ backgroundColor: 'transparent', width: '100%', height: '97vh' }}>
				<Poster user={this.state.user}/>
				{this.state.posts.map(post => {
					return(
						<Post post={post}/>
					)
				})}
				{/* <Post post={test}/> */}
				{this.state.posts.length === 0 && 
					<div style={styles.empty}>
						<span style={styles.icon}><i class="far fa-frown"></i></span>
						<span style={styles.text}>It seems like you don't have friends <br /> or they haven't posted yet.</span>
					</div>
				}
			</div>
		);
	}
}

const styles = {
	empty: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		height: '65%',
		width: '100%',
		borderStyle: 'dashed',
		borderWidth: 2,
		borderColor: 'grey',
		borderRadius: 20,
		fontFamily: 'Heebo',
		color: 'grey',
		opacity: 0.8
	},
	icon: {
		fontSize: 50,
		paddingBottom: 20,
		paddingTop: 20
	},
	text: {
		fontSize: 30, 
		fontWeight: '900', 
		textAlign: 'center', 
		lineHeight: 1.1, 
		paddingBottom: 20
	}
}