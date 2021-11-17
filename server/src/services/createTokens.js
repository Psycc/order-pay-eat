import { sign } from 'jsonwebtoken';

export const createAccessToken = (user) => {
	return sign({ userId: user.userId }, process.env.ACCESS_TOKEN, {
		expiresIn: '5m',
	});
};

export const createRefreshToken = (user) => {
	return sign(user, process.env.REFRESH_TOKEN, {
		expiresIn: '7d',
	});
};