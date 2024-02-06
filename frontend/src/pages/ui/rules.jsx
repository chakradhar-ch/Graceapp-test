import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import WebThemeProvider from './WebThemeProvider';

const Rules = () => {

	return (
		<WebThemeProvider>
			<div>

				<section className="">
					<div class="container innerpageContent">
						<div class="card-body mt-4 " style={{ paddingBottom: "26vh" }}>
							<div className="mb-2">
								<label htmlFor="">
									<h2>
										<strong>Rules of the Game</strong>
									</h2>

									<p>Enter the game by picking a number.</p>

									<p>
										At the end of the giveaway period, the lowest number chosen by
										exactly one player will be the winning number. That day the
										person will be sent an email asking for information on how to
										send them their prize. Winners in the continental US will have
										a prize shipped to them free of charge. Any winner who does
										not live in the continental US will recieve a virtual visa
										gift card. The minimum visa card will be $25.
									</p>

									<p>
										The value of the prize is based upon how many people played
										the game. As the number of players increases, the value of the
										prize chosen will also increase. Any email address that wins a
										prize is ineligible to continue playing the game until they've
										shared a photo on social media of themselves with their prize.
									</p>
								</label>


							</div>
						</div>
					</div>
				</section>

			</div>
		</WebThemeProvider>
	);
};

export default Rules;
