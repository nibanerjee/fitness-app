import React from 'react';

function HomeOption(props) {
	return(
		<div className="col-sm-6 home-option">
			<div className="option-card">
				<div className="card-title">{props.name}</div>
				<div className="card-description">{props.description}</div>
				<div className="card-cta">
					<a href={props.link} className="btn cta-btn">
						Go
						<i className="fas fa-angle-right"></i>
					</a>
				</div>
			</div>
		</div>
	)
}

export default HomeOption;