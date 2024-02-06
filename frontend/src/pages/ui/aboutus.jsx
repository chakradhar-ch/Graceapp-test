import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import WebThemeProvider from './WebThemeProvider';

const About = () => {

	return (
	<WebThemeProvider>
			<div>
		
		<section className="">
			<div class="container innerpageContent">
				<div class="card-body mt-5 " style={{ paddingBottom: "54vh" }}>
					<div className="mb-2">
						<label htmlFor="">
							<p>Greetings!</p>
							<p>
							My name is Adolphus. I’m a disciple of Jesus Christ who is my Lord
							and Savior. I’m a U.S. Army Veteran and an entrepreneur. But more
							than anything else, I’m a socially conscious person, who loves and
							enjoys helping people especially the homeless. My purpose in life
							now is to be a blessing to others. I truly believe that where much
							is given much is required.
							</p>
							<p>
							Welcome to Adolphus Table, a game where you can put your skills
							to the test. You can play for free, and win gifts and cash prizes at no cost to you. However, Adolphus Table is more than just a free game
							that has many gifts to be given away.
							</p>
							<p>
							I created my Table for two types of people to come and sit and receive
							financial blessings. The first type are people who have a job but are still
							struggling to make ends meet financially. The second type are people
							with a socially conscious mindset who love helping people.
							</p>
							<p>My free game on this website is just an appetizer of what is to come for those who sit at my Table. (You do not have to invest any money to sit at the Table.)</p>
						</label>
					</div>
				</div>
			</div>
		</section>
	
	</div>
	</WebThemeProvider>
	);
};

export default About;
